import numpy as np
import matplotlib.pyplot as plt

# roots of x^2 + 1 = 0  →  x = ±i
coeffs = [1, 0, 1]
roots = np.roots(coeffs)

re = np.linspace(-2, 2, 80)
im = np.linspace(-2, 2, 80)
Re, Im = np.meshgrid(re, im)
Z = Re + 1j * Im
mag = np.abs(Z**2 + 1)

fig = plt.figure(figsize=(9, 7))
ax = fig.add_subplot(111, projection="3d")

ax.plot_surface(Re, Im, mag, cmap="viridis", alpha=0.85, linewidth=0, antialiased=True)
ax.scatter(
    roots.real,
    roots.imag,
    np.zeros(len(roots)),
    color="red",
    s=80,
    depthshade=False,
    label="roots (zeros)",
)
for r in roots:
    ax.text(r.real, r.imag, 0.15, f"{r.real:.0f}{r.imag:+.0f}j", color="red")

ax.set_xlabel("Re")
ax.set_ylabel("Im")
ax.set_zlabel(r"$|z^2 + 1|$")
ax.set_title(r"$|z^2 + 1|$ over the complex plane (zeros at $\pm i$)")
ax.legend(loc="upper left")

print("Roots of x^2 + 1 = 0:")
for r in roots:
    print(f"  {r}")

plt.tight_layout()
plt.show()
