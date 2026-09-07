# Bill of materials — hydrostatic liquid-level

Team: Thrishanth, Siddharth Sharma (ECL204 MNI mini-project).

**Buy the gauge module this week.** Do not wait on a BMP280 / BME280. Those are absolute barometers (~1 kPa of weather noise versus ~1 kPa per 10 cm of water) and will not calibrate cleanly in a 3-minute demo.

The cheap HX710B board is an **air** sensor. Water must not enter the port. Level is inferred from the air column in the tube; the ruler calibration absorbs the rest.

## Order this (preferred)

| Qty | Part | Why | Where (India, check stock/price) |
|-----|------|-----|----------------------------------|
| 1 | **MPS20N0040D-D + HX710B** module, 0–40 kPa gauge | Diaphragm + Wheatstone + 24-bit ADC. 40 kPa ≈ 4 m water; a 30–50 cm bottle is plenty. | [Makestore](https://www.makestore.in/product/hx710b-air-pressure-0-40kpa-sensor-module/) (~₹130); [Syntronix](https://syntronix.in/product/mps20n0040d-pressure-sensor-hx710b/); [Graylogix](https://www.graylogix.in/product/mps20n0040d-pressure-sensor-hx710b); [Zbotic](https://zbotic.in/product/hx710b-air-pressure-sensor-module-water-level-sensor-module-0-40kpa/) |
| 1 | **ESP32 DevKit** (WROOM-32 / DevKitC) | MCU. Arduino-ESP32 core; do not use Wi-Fi. | Skip if you have one; otherwise Robu / Robocraze “ESP32 DevKit” |
| 1 | 16×2 LCD with soldered I2C backpack (0x27 or 0x3F) | Demo display. Power from **3.3 V** so SDA/SCL stay ESP32-safe. If the LCD stays blank, a 0.96″ SSD1306 OLED is the 3.3 V alternative. | [Robocraze](https://robocraze.com/products/16x2-lcd-blue-with-i2c-interface); [Robu](https://robu.in/product/lcd1602-parallel-lcd-display-with-iic-i2c-interface/) |
| 1 | 1–1.5 L PET bottle + cap | Tank | Grocery |
| 1 | Silicone / PVC tube, ~4–6 mm ID, 30–50 cm | Dry air column from bottle to sensor | Hardware / aquarium shop |
| 1 | 30–50 cm steel ruler or scale, 1 mm | Independent standard | Stationery |
| 1 | Breadboard + jumper wires | Wiring | Kit |

Optional: extra LED (GPIO 2 onboard is enough for overflow), hot-glue or cable gland so the tube does not leak at the bottle.

## Fallback (if the HX710B module is out of stock)

**MPX5010DP** (0–10 kPa ≈ 1 m water) is the analog fallback. Its output goes to ~4.7 V, so it needs a divider before an ESP32 ADC pin, and that ADC is a poor metrology story. Prefer the HX710B module. If you still use MPX5010DP, keep the same `h = a * reading + b` calibration.

## Do not buy for this project

- BMP280 / BME280 / BMP180 (weather / altimeter)
- FSR / force-sensitive resistor (force, not hydrostatic pressure)
- Blood-pressure cuff kits
- Wi-Fi dashboards / “IoT tank” (the ESP32 radio stays off)

## Pin names on the HX710B module

Listings sometimes print `SLC` or even “I2C”. It is **not** I2C. Same two-wire clocked protocol as HX711:

| Module pad | ESP32 DevKit |
|------------|---------|
| VCC / VIN (use **3.3 V**, not 5 V) | 3V3 |
| GND | GND |
| OUT / DOUT / DT | GPIO 16 |
| SCK / SCLK / SLC | GPIO 17 |

LCD: VCC→3V3, GND→GND, SDA→GPIO 21, SCL→GPIO 22. Do not feed 5 V into the I2C lines.
