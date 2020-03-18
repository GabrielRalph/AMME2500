syms t;
theta_30 = (exp(t) - t - 1)/200 == pi/6;
rule = t > 0;
solution = solve([theta_30 rule]);
fprintf('%s = %.4d\n', solution, double(solution));