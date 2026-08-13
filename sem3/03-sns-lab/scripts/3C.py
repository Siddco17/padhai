import numpy as np
import matplotlib.pyplot as plt

raw = input("Enter angular frequency ω [default=2π]: ").strip()
w = float(raw) if raw else 2
w=w*np.pi

t = np.linspace(0, 2, 400)
z = np.exp(1j * w * t)
theta = np.linspace(0, 2 * np.pi, 200)

fig = plt.figure(figsize=(12, 8))

# --- 3D helix ---
ax = fig.add_subplot(2, 2, (1, 2), projection="3d")
ax.plot(z.real, z.imag, t, lw=1.5, label=r"$e^{j\omega t}$")
ax.scatter([z.real[0]], [z.imag[0]], [t[0]], s=60, color="red", label="t = 0")
ax.plot(np.cos(theta), np.sin(theta), np.zeros_like(theta), "k--", lw=0.8, label="unit circle (t=0)")
ax.set_xlabel("Re = cos(ωt)")
ax.set_ylabel("Im = sin(ωt)")
ax.set_zlabel("t")
ax.set_title(rf"3D helix: $e^{{j\omega t}}$, $\omega={w:.3g}$")
ax.legend(loc="upper left")

# --- 2D complex plane ---
ax = fig.add_subplot(2, 2, 3)
ax.plot(np.cos(theta), np.sin(theta), "k--", lw=0.8, label="unit circle")
ax.plot(z.real, z.imag, lw=1.5, label=r"$e^{j\omega t}$")
ax.scatter([z.real[0]], [z.imag[0]], s=60, zorder=3, color="red", label="t = 0")
ax.axhline(0, color="k", lw=0.8)
ax.axvline(0, color="k", lw=0.8)
ax.set_aspect("equal")
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel("Re")
ax.set_ylabel("Im")
ax.set_title("2D complex plane")
ax.grid(True)
ax.legend(loc="upper right")

# --- 2D Re & Im vs time ---
ax = fig.add_subplot(2, 2, 4)
ax.plot(t, z.real, label=r"Re $= \cos(\omega t)$")
ax.plot(t, z.imag, label=r"Im $= \sin(\omega t)$")
ax.axhline(0, color="k", lw=0.8)
ax.set_xlabel("t")
ax.set_ylabel("amplitude")
ax.set_title(r"2D: $e^{j\omega t} = \cos(\omega t) + j\sin(\omega t)$")
ax.grid(True)
ax.legend()

print(f"ω = {w}")
print(f"|e^{{jωt}}| ≈ {np.max(np.abs(z)):.6f} (should be 1)")

plt.tight_layout()
plt.show()
