
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
q1iii = figure();
plot(velocity_range, stop_distance_A, velocity_range, stop_distance_B);
title('Stopping distance');
ylabel('x position at stop (m)');
xlabel('initial velocity (m/s)');
r = refline([0 48]);
r.Color = 'r';
legend('Model A', 'Model B');
saveas(q1iii, 'q1-iii.svg');

dataA = simulateStop(soln_A(1), 'A');
dataB = simulateStop(soln_B(1), 'B');
q1iv = figure('position', [0 0 210*4 297*4]);
subplot(3,1,1);
plot(dataA(:, 1), dataA(:, 2),dataB(:, 1), dataB(:, 2));
title('Position at time t');
ylabel('x position (m)');
xlabel('time (s)');
legend('Model A', 'Model B');
subplot(3,1,2);
plot(dataA(:, 1), dataA(:, 3),dataB(:, 1), dataB(:, 3));
title('Velocity at time t');
ylabel('x velocity (m/s)');
xlabel('time (s)');
legend('Model A', 'Model B');
subplot(3,1,3);
plot(dataA(:, 2), dataA(:, 4),dataB(:, 2), dataB(:, 4));
title('Mu at x position');
ylabel('\mu');
xlabel('x position (m)');
legend('Model A', 'Model B');
saveas(q1iv, 'q1-iv.svg');