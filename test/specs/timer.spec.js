const Timer = require('../../src/pomodoro/timer');

describe('Timer', () => {
    let $item = null;
    let timer = null;

    beforeEach(() => {
        $item = document.createElement('ciasteczko');
        timer = new Timer();
    });

    describe('decrease function', () => {
        it('should reduce value', () => {
            $item.textContent = '76';

            timer.decreaseElement($item);

            expect($item.textContent).toEqual('75');

            // Teardown - remove what is not needed anymore
        });

        it('should return MINIMUM_CLOCK_VALUE for 0', () => {
            $item.textContent = '0';

            timer.decreaseElement($item);

            expect($item.textContent).toEqual('0');
        });

        it('should return MINIMUM_CLOCK_VALUE for -1', () => {
            $item.textContent = '-1';

            timer.decreaseElement($item);

            expect($item.textContent).toEqual('0');
        });

        it('should throw exception when HTMLElement does not have number as value', () => {
            $item.textContent = 'ciasteczko';

            expect(() => timer.decreaseElement($item)).toThrow();
        });
    });

    describe('increase function', () => {
        it('should increase value', () => {
            $item.textContent = '37';

            timer.increaseElement($item);

            expect($item.textContent).toEqual('38');
        });

        it('should return MAXIMUM_CLOCK_VALUE when value out of range', () => {
            $item.textContent = '112';

            timer.increaseElement($item);

            expect($item.textContent).toEqual('60');
        });

        it('should throw exception when HTMLElement does not have number as value', () => {
            $item.textContent = 'ciasteczko';

            expect(() => timer.increaseElement($item)).toThrow();
        });
    });

    describe('startTimer', () => {
        it('should call "timeCounter"', () => {
            const $breakTime = document.createElement('break');
            const $sessionTime = document.createElement('session');
            $breakTime.textContent = '1';
            $sessionTime.textContent = '1';

            timer.timeCounter = jest.fn();
            jest.spyOn(timer, 'timeCounter');
            timer.startTimer($breakTime, $sessionTime);

            expect(timer.timeCounter).toHaveBeenCalled();
            expect(timer.timeCounter).toHaveBeenCalledTimes(1);
            expect(timer.timeCounter).toHaveBeenCalledWith(Timer.ONE_MINUTE_IN_MILLISECONDS, Timer.ONE_MINUTE_IN_MILLISECONDS);
        });
    });
});
