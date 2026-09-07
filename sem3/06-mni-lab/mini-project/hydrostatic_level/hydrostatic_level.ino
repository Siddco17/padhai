// Hydrostatic liquid-level meter: MPS20N0040D-D + HX710B on ESP32 DevKit.
// Board: ESP32 Dev Module (Arduino-ESP32). Power HX710B from 3.3 V, not 5 V.
// CAL: print averaged raw counts. RUN: h = CAL_A * raw + CAL_B (cm).
// After fit.py / fit.m, paste CAL_A and CAL_B below.

#include <Wire.h>

const int PIN_DOUT = 16;
const int PIN_SCK = 17;
const int PIN_OVERFLOW = 2;  // onboard LED on most DevKit C boards
const int PIN_SDA = 21;
const int PIN_SCL = 22;

const uint8_t LCD_ADDR = 0x27;  // try 0x3F if the display stays blank
const bool USE_LCD = true;

const int N_AVG = 8;
const float H_MAX_CM = 45.0f;

// Paste least-squares coefficients here. Leave 0,0 to stay in CAL.
float CAL_A = 0.0f;
float CAL_B = 0.0f;

enum Mode { MODE_CAL, MODE_RUN };
Mode mode = MODE_CAL;

const uint8_t LCD_BL = 0x08;
const uint8_t LCD_EN = 0x04;
const uint8_t LCD_RS = 0x01;

void lcdPulse(uint8_t data) {
  Wire.beginTransmission(LCD_ADDR);
  Wire.write(data | LCD_BL | LCD_EN);
  Wire.endTransmission();
  delayMicroseconds(1);
  Wire.beginTransmission(LCD_ADDR);
  Wire.write((data | LCD_BL) & ~LCD_EN);
  Wire.endTransmission();
  delayMicroseconds(50);
}

void lcdNibble(uint8_t nibble, bool rs) {
  uint8_t data = (nibble & 0xF0) | (rs ? LCD_RS : 0);
  lcdPulse(data);
}

void lcdByte(uint8_t value, bool rs) {
  lcdNibble(value, rs);
  lcdNibble(value << 4, rs);
}

void lcdInit() {
  if (!USE_LCD) {
    return;
  }
  Wire.begin(PIN_SDA, PIN_SCL);
  delay(50);
  lcdNibble(0x30, false);
  delay(5);
  lcdNibble(0x30, false);
  delayMicroseconds(150);
  lcdNibble(0x30, false);
  lcdNibble(0x20, false);
  lcdByte(0x28, false);
  lcdByte(0x08, false);
  lcdByte(0x01, false);
  delay(2);
  lcdByte(0x06, false);
  lcdByte(0x0C, false);
}

void lcdLine(uint8_t row, const char *text) {
  if (!USE_LCD) {
    return;
  }
  lcdByte(row == 0 ? 0x80 : 0xC0, false);
  for (uint8_t i = 0; i < 16; i++) {
    char c = text[i];
    if (c == 0) {
      while (i < 16) {
        lcdByte(' ', true);
        i++;
      }
      break;
    }
    lcdByte(c, true);
  }
}

bool hxReady(unsigned long timeout_ms) {
  unsigned long t0 = millis();
  while (digitalRead(PIN_DOUT) == HIGH) {
    if (millis() - t0 > timeout_ms) {
      return false;
    }
  }
  return true;
}

bool hxRead(long *out) {
  if (!hxReady(300)) {
    return false;
  }
  long val = 0;
  for (int i = 0; i < 24; i++) {
    digitalWrite(PIN_SCK, HIGH);
    delayMicroseconds(1);
    val = (val << 1) | digitalRead(PIN_DOUT);
    digitalWrite(PIN_SCK, LOW);
    delayMicroseconds(1);
  }
  digitalWrite(PIN_SCK, HIGH);
  delayMicroseconds(1);
  digitalWrite(PIN_SCK, LOW);
  delayMicroseconds(1);
  if (val & 0x800000L) {
    val |= ~0xFFFFFFL;
  }
  *out = val;
  return true;
}

bool hxAverage(long *out) {
  long sum = 0;
  for (int i = 0; i < N_AVG; i++) {
    long x;
    if (!hxRead(&x)) {
      return false;
    }
    sum += x;
  }
  *out = sum / N_AVG;
  return true;
}

void setup() {
  pinMode(PIN_DOUT, INPUT);
  pinMode(PIN_SCK, OUTPUT);
  digitalWrite(PIN_SCK, LOW);
  pinMode(PIN_OVERFLOW, OUTPUT);
  Serial.begin(115200);
  lcdInit();
  if (CAL_A == 0.0f && CAL_B == 0.0f) {
    mode = MODE_CAL;
  } else {
    mode = MODE_RUN;
  }
  Serial.println(F("hydrostatic-level  c=CAL  r=RUN"));
}

void loop() {
  if (Serial.available()) {
    char c = Serial.read();
    if (c == 'c' || c == 'C') {
      mode = MODE_CAL;
    }
    if (c == 'r' || c == 'R') {
      mode = MODE_RUN;
    }
  }

  long raw;
  char line0[17];
  char line1[17];
  if (!hxAverage(&raw)) {
    lcdLine(0, "sensor timeout");
    lcdLine(1, "check 16/17");
    Serial.println(F("timeout"));
    delay(200);
    return;
  }

  if (mode == MODE_CAL) {
    snprintf(line0, sizeof(line0), "CAL raw");
    snprintf(line1, sizeof(line1), "%ld", raw);
    lcdLine(0, line0);
    lcdLine(1, line1);
    Serial.print(F("raw,"));
    Serial.println(raw);
    digitalWrite(PIN_OVERFLOW, LOW);
    delay(400);
    return;
  }

  float h = CAL_A * (float)raw + CAL_B;
  digitalWrite(PIN_OVERFLOW, h > H_MAX_CM ? HIGH : LOW);
  char hbuf[12];
  dtostrf(h, 5, 1, hbuf);
  snprintf(line0, sizeof(line0), "h=%s cm", hbuf);
  snprintf(line1, sizeof(line1), "raw=%ld", raw);
  lcdLine(0, line0);
  lcdLine(1, line1);
  Serial.print(F("h_cm,"));
  Serial.print(h, 2);
  Serial.print(',');
  Serial.println(raw);
  delay(200);
}
