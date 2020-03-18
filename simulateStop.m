function r = simulateStop(v0, model)
    %Define constants used
    dt = 0.01;
    g = 9.81;
    
    %Define arrays that will store data with base cases
    v = v0;
    x = 0;
    mu = [];
    t = 0;
    
    idx = 1;
    while v(idx) > 0
        
        %Push mu value to the array based on the distance of the car and
        %model selected
        if x(idx) > 14 && x(idx) < 31 && model == 'B'
            mu = [mu; 0.12 + 0.07*exp(0.06*v(idx))];
        else
            mu = [mu; 0.7];
        end
        %Calculate and push new position and velocity and the current time
        v = [v; v(idx) - g*dt*mu(idx)];
        x = [x; x(idx) + dt*v(idx+1)];
        t = [t; idx*dt];
        idx = idx + 1;
    end
    mu = [mu; 0.7];
    r = [t, x, v, mu];
end