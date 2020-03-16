
stop_distance_A = 20:0.1:30;
stop_distance_B = 20:0.1:30;
velocity_range = 20:0.1:30;
idx = 1;
soln_A = [0,0,0,0,0];
soln_B = [0,0,0,0,0];
for i = velocity_range
    data = simulate_stop(i, 'A');
    stop = data(size(data, 1), :);
    stop_distance_A(idx) = stop(2);
    if abs(stop(2) - 48) < abs(soln_A(3) - 48)
        soln_A = [i, stop];
    end
    
    data = simulate_stop(i, 'B');
    stop = data(size(data, 1), :);
    stop_distance_B(idx) = stop(2);
    if abs(stop(2) - 48) < abs(soln_B(3) - 48)
        soln_B = [i, stop];
    end
    idx = idx + 1;
end
subplot(2,2,1);
plot(velocity_range, stop_distance_A, velocity_range, stop_distance_B);

dataA = simulate_stop(soln_A(1), 'A');
dataB = simulate_stop(soln_B(1), 'B');
subplot(2,2,2);
plot(dataA(:, 1), dataA(:, 2),dataB(:, 1), dataB(:, 2));
subplot(2,2,3);
plot(dataA(:, 1), dataA(:, 3),dataB(:, 1), dataB(:, 3));
subplot(2,2,4);
plot(dataA(:, 2), dataA(:, 4),dataB(:, 2), dataB(:, 4));