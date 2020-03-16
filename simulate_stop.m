
function r = simulate_stop(v0, model)
    dt = 0.01;
    g = 9.81;
    
    v = v0;
    x = 0;
    idx = 1;
    mu = [];
    t = 0;
    while v(idx) > 0
        
        if x(idx) > 14 && x(idx) < 31 && model == 'B'
            mu = [mu; 0.12 + 0.07*exp(0.06*v(idx))];
        else
            mu = [mu; 0.7];
        end
        v = [v; v(idx) - g*dt*mu(idx)];
        x = [x; x(idx) + dt*v(idx)];
        t = [t; idx*dt];
        idx = idx + 1;
    end
    mu = [mu; 0];
    r = [t, x, v, mu];
end