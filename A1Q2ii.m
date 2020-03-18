r = 100;
syms t;
theta_30 = 0.5*(exp(t) - t - 1)/r == pi/6;
rule = t > 0;
solution = solve([theta_30 rule]);
t = double(solution);
fprintf('t = %s = %.4d\n\n', solution, t);


v_t = 0.5*(exp(t) - 1);
a_t = 0.5*exp(t);
a_c = v_t^2/r;
a = sqrt(a_t^2 + a_c^2);
fprintf('v = %.5g and a = %.5g\n\n', v_t, a);