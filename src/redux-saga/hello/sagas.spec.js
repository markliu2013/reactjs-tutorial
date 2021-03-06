import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay } from './sagas'

describe('incrementAsync Saga test', () => {

    const gen = incrementAsync()

    //console.log(gen.next())
    //console.log(gen.next())
    //console.log(gen.next())

    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });

    it('incrementAsync Saga must call delay(1000)', () => {
        expect(gen.next().value).toStrictEqual(call(delay, 1000));
    });

    it('incrementAsync Saga must dispatch an INCREMENT action', () => {
        expect(gen.next().value).toStrictEqual(put({type: 'INCREMENT'}));
    });

    it('incrementAsync Saga must be done', () => {
        expect(gen.next()).toStrictEqual({ done: true, value: undefined });
    });

});