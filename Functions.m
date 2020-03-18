
stop_distance_A = 20:0.1:30;
stop_distance_B = 20:0.1:30;
velocity_range = 20:0.1:30;
idx = 1;
soln_A = [0,0,0,0,0];
soln_B = [0,0,0,0,0];
for i = velocity_range
    data = simulateStop(i, 'A');
    stop = data(size(data, 1), :);
    stop_distance_A(idx) = stop(2);
    if abs(stop(2) - 48) < abs(soln_A(3) - 48)
        soln_A = [i, stop];
    end
    
    data = simulateStop(i, 'B');
    stop = data(size(data, 1), :);
    stop_distance_B(idx) = stop(2);
    if abs(stop(2) - 48) < abs(soln_B(3) - 48)
        soln_B = [i, stop];
    end
    idx = idx + 1;
end

plot(velocity_range, stop_distance_A, velocity_range, stop_distance_B);
title('Stopping distance');
ylabel('Stopping distance (m)');
xlabel('Initial velocity (m/s)');
refline([0 48]);
saveas(gcf, 'stop-distance-vs-initial-velocit.svg');
clf;
dataA = simulateStop(soln_A(1), 'A');
dataB = simulateStop(soln_B(1), 'B');

subplot(3,1,1);
plot(dataA(:, 1), dataA(:, 2),dataB(:, 1), dataB(:, 2));
subplot(3,1,2);
plot(dataA(:, 1), dataA(:, 3),dataB(:, 1), dataB(:, 3));
subplot(3,1,3);
plot(dataA(:, 2), dataA(:, 4),dataB(:, 2), dataB(:, 4));