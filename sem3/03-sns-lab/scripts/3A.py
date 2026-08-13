import numpy as np
import matplotlib.pyplot as plt

raw = input("Enter amplitude of periodic sinusoid [default: 5]: ").strip()
A_p = float(raw) if raw else 5.0

raw = input("Enter frequency of periodic sinusoid [default: 1]: ").strip()
f_p = float(raw) if raw else 1.0

raw = input("Enter amplitude of non-periodic sinusoid [default: 5]: ").strip()
A_np = float(raw) if raw else 5.0

raw = input("Enter frequency of non-periodic sinusoid [default: 5]: ").strip()
w_np = float(raw) if raw else 5.0
f_np = w_np / (2 * np.pi)

raw = input("Enter the interval between steps [default: 0.1]: ").strip()
dt = float(raw) if raw else 0.1

n = np.arange(0, 5 + dt, dt)

w_p = 2 * np.pi * f_p

x_p = A_p * np.sin(w_p * n)
x_np = A_np * np.sin(w_np * n)
x_sum = x_p + x_np

fig, axes = plt.subplots(3, 1, figsize=(10, 8))

axes[0].stem(n, x_p)
axes[0].set_title("Periodic:")
axes[0].grid(True)

axes[1].stem(n, x_np)
axes[1].set_title("Non-periodic:")
axes[1].grid(True)

axes[2].stem(n, x_sum)
axes[2].set_title("Sum of the two")
axes[2].set_xlabel("n")
axes[2].grid(True)


plt.tight_layout()
plt.show()
