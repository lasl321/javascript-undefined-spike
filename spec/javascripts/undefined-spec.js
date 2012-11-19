/*global globalVariableThatWasNotDeclared: true*/
var globalVariableThatWasNotInitialized;

(function (window) {
    'use strict';

    var describe = window.describe,
        it = window.it,
        beforeEach = window.beforeEach,
        afterEach = window.afterEach,
        expect = window.expect;

    function triggerVariableUse(v) {
    }

    describe("A global variable", function () {
        describe("that was not declared", function () {
            describe("and is accessed without a base", function () {
                it("should trigger a reference error", function () {
                    var exceptionThrown;

                    try {
                        triggerVariableUse(globalVariableThatWasNotDeclared);
                    } catch (e) {
                        exceptionThrown = e;
                    }

                    expect(exceptionThrown instanceof ReferenceError).toBeTruthy();
                });

                it("should be of type undefined", function () {
                    expect(typeof globalVariableThatWasNotDeclared).toEqual('undefined');
                });

                it("should trigger a reference error when used as a property target", function () {
                    var thrownException;

                    try {
                        triggerVariableUse(globalVariableThatWasNotDeclared.someProperty);
                    } catch (e) {
                        thrownException = e;
                    }

                    expect(thrownException instanceof ReferenceError).toBeTruthy();
                });
            });

            describe("and is accessed with a base", function () {
                it("should return undefined", function () {
                    expect(window.globalVariableThatWasNotDeclared).toEqual(undefined);
                });

                it("should be of type undefined", function () {
                    expect(typeof window.globalVariableThatWasNotDeclared).toEqual('undefined');
                });

                it("should trigger a type error when used as a property target", function () {
                    var thrownException;

                    try {
                        triggerVariableUse(window.globalVariableThatWasNotDeclared.someProperty);
                    } catch (e) {
                        thrownException = e;
                    }

                    expect(thrownException instanceof TypeError).toBeTruthy();
                });
            });
        });

        describe("that was declared", function () {
            it("should return undefined", function () {
                expect(globalVariableThatWasNotInitialized).toEqual(undefined);
            });

            it("should be of type undefined", function () {
                expect(typeof globalVariableThatWasNotInitialized).toEqual('undefined');
            });

            it("should cause a TypeError when used with a property", function () {
                var exceptionThrown;
                try {
                    triggerVariableUse(globalVariableThatWasNotInitialized.someProperty);
                } catch (e) {
                    exceptionThrown = e;
                }

                expect(exceptionThrown instanceof TypeError).toBeTruthy();
            });
        });
    });

    describe("A local variable", function () {
        describe("that was declared", function () {
            var uninitializedVariable;

            it("should return undefined", function () {
                expect(uninitializedVariable).toEqual(undefined);
            });

            it("should be of type undefined", function () {
                expect(typeof uninitializedVariable).toEqual('undefined');
            });
        });

        describe("that was set to undefined", function () {
            var variableSetToUndefined;

            beforeEach(function () {
                variableSetToUndefined = undefined;
            });

            it("should return undefined", function () {
                expect(variableSetToUndefined).toEqual(undefined);
            });

            it("should of type undefined", function () {
                expect(typeof variableSetToUndefined).toEqual('undefined');
            });
        });
    });

    describe("The undefined global variable", function () {
        it("should return undefined", function () {
            expect(undefined).toEqual(undefined);
        });

        it("should be of type undefined", function () {
            expect(typeof undefined).toEqual('undefined');
        });
    });
}(window));