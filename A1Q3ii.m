L = 4;
g = 9.81;
v0 = 4;

h = 0.5*v0^2/g;
theta = acos(1 - h/L);
T = (1 - h/L)*30*g;
fprintf('theta = %g deg and the tension in the rope T = %g\n\n', theta*180/pi, T);