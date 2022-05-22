import { HTMLTokenKind, Lexer } from '../src/Lexer';

describe('test lexer', () => {
  it('should return array of correct identifier for basic html input', () => {
    const content = '<p>Coucou</p>';
    const expected: Array<HTMLTokenKind> = [
      HTMLTokenKind.OpenAngleBracket,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.CloseAngleBracket,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.OpenAngleBracket,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.CloseAngleBracket,
    ];

    const lexer = new Lexer(content);
    const parsedTokens = lexer.parse();
    const parsedTokensKind = parsedTokens.map((token) => token.type);

    expect(parsedTokensKind).toEqual(expected);
  });

  it('should return array of correct identifier with variable in html input', function () {
    const content = '<p>Coucou {{ name }}</p>';
    const expected: Array<HTMLTokenKind> = [
      HTMLTokenKind.OpenAngleBracket,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.CloseAngleBracket,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.OpenDoubleBrace,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.CloseDoubleBrace,
      HTMLTokenKind.OpenAngleBracket,
      HTMLTokenKind.StrIdentifier,
      HTMLTokenKind.CloseAngleBracket,
    ];

    const lexer = new Lexer(content);
    const parsedTokens = lexer.parse();
    const parsedTokensKind = parsedTokens.map((token) => token.type);

    expect(parsedTokensKind).toEqual(expected);
  });
});
