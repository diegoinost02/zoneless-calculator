import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {
  let service: CalculatorService;

  // antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  // antes de todas las pruebas
  beforeAll(() => {});
  // despues de cada prueba
  afterEach(() => {});
  // despues de todas las pruebas
  afterAll(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText to "20" when C is pressed', () => {
    service.resultText.set('100');
    service.subResultText.set('100');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('5');
    service.constructNumber('-');

    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('5');
    expect(service.resultText()).toBe('0');
  });
  
  it('should calculate result correctly for addition', () => {
    service.constructNumber('3');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');

  });
  it('should calculate result correctly for addition', () => {
    service.constructNumber('3');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('4');
    service.constructNumber('*');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('12');
  });
  
  it('should calculate result correctly for division', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('3');
    service.constructNumber('.');
    service.constructNumber('1');
    service.constructNumber('4');
    
    expect(service.resultText()).toBe('3.14');
    service.constructNumber('.');
    expect(service.resultText()).toBe('3.14');
  });

  it('should handle decimal point correctly starting with 0', () => {
    service.constructNumber('3');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');
    
    expect(service.resultText()).toBe('3.0');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('5');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-5');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('5');
  });

  it('should handle Backspace correctly', () => {
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    expect(service.resultText()).toBe('123');
    
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
  });

  it('should handle max length correctly', () => {
    for (let i = 0; i < 10; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);

  });

});