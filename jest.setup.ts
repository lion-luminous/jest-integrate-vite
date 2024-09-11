import '@testing-library/jest-dom';

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(), // no-op
        removeListener: jest.fn(), // no-op
        addEventListener: jest.fn(), // no-op
        removeEventListener: jest.fn(), // no-op
        dispatchEvent: jest.fn() // no-op
    };
};