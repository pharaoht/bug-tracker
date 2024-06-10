const { camelToSnake } = require('./index'); 

describe('camelToSnake', () => {
  it('should convert camel case to snake case', () => {
    // Test cases
    expect(camelToSnake('myVariableName')).toBe('my_variable_name');
    expect(camelToSnake('anotherVariable')).toBe('another_variable');
    expect(camelToSnake('camelCaseString')).toBe('camel_case_string');
    expect(camelToSnake('snake_case_string')).toBe('snake_case_string'); 
  });

});
