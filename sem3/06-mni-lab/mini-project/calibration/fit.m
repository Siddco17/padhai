% Least-squares h = a * raw + b and static characteristics.
% Default: sample.csv (synthetic). After the lab, edit fname.

thisDir = fileparts(mfilename("fullpath"));
fname = fullfile(thisDir, "sample.csv");
if exist("csvPath", "var")
    fname = csvPath;
end

T = readtable(fname);
direction = lower(strtrim(string(T.direction)));
fill1 = T(direction == "fill" & T.cycle == 1, :);
if size(fill1, 1) < 3
    error("need at least 3 fill/cycle-1 points");
end

raw = fill1.raw;
h = fill1.height_cm;
p = polyfit(raw, h, 1);
a = p(1);
b = p(2);
h_hat = polyval(p, raw);
resid = h_hat - h;
span = max(h) - min(h);

lin_cm = max(abs(resid));
lin_pct = 100 * lin_cm / span;

drain1 = T(direction == "drain" & T.cycle == 1, :);
hyst_cm = 0;
for i = 1:size(fill1, 1)
    hi = fill1.height_cm(i);
    j = find(drain1.height_cm == hi, 1);
    if isempty(j)
        continue
    end
    dh = abs((a * fill1.raw(i) + b) - (a * drain1.raw(j) + b));
    hyst_cm = max(hyst_cm, dh);
end
hyst_pct = 100 * hyst_cm / span;

rep_cm = 0;
fill = T(direction == "fill", :);
uh = unique(fill.height_cm);
for k = 1:numel(uh)
    idx = fill.height_cm == uh(k);
    if nnz(idx) < 2
        continue
    end
    hv = a * fill.raw(idx) + b;
    rep_cm = max(rep_cm, max(hv) - min(hv));
end
rep_pct = 100 * rep_cm / span;

fprintf("file: %s\n", fname);
fprintf("h = %.8g * raw + %.8g\n\n", a, b);
fprintf("Paste into hydrostatic_level.ino:\n");
fprintf("float CAL_A = %.8gf;\n", a);
fprintf("float CAL_B = %.8gf;\n\n", b);
fprintf("span                 %.3f cm\n", span);
fprintf("sensitivity          %.6g cm/count\n", a);
fprintf("linearity (max|e|)   %.4f cm  (%.3f %% span)\n", lin_cm, lin_pct);
fprintf("hysteresis           %.4f cm  (%.3f %% span)\n", hyst_cm, hyst_pct);
fprintf("repeatability        %.4f cm  (%.3f %% span)\n", rep_cm, rep_pct);
fprintf("resolution (1 count) %.6g cm\n", abs(a));

figure;
plot(raw, h, "o");
hold on;
if size(drain1, 1) > 0
    plot(drain1.raw, drain1.height_cm, "s");
end
xfit = linspace(min(raw), max(raw), 50);
plot(xfit, a * xfit + b, "-");
grid on;
xlabel("raw counts");
ylabel("ruler height (cm)");
title("Calibration");
legend("fill (cycle 1)", "drain (cycle 1)", "least squares", "Location", "best");
