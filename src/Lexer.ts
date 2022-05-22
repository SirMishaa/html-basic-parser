export enum HTMLTokenKind {
  OpenDoubleBrace = 'OpenDoubleBrace',
  CloseDoubleBrace = 'CloseDoubleBrace',
  StrIdentifier = 'StrIdentifier',
  OpenAngleBracket = 'OpenAngleBracket',
  CloseAngleBracket = 'CloseAngleBracket',
}

export interface HTMLTokenInterface {
  type: HTMLTokenKind;
  startOffset: number;
  tokenSize: number;
}

export class Lexer {
  constructor(private readonly content: string) {}

  public parse(): Array<HTMLTokenInterface> {
    const chars = this.content.split('');
    const parsedToken: Array<HTMLTokenInterface> = [];

    for (let iteration = 0; iteration < chars.length; ) {
      const char = chars.at(iteration);
      const nextChar = chars.at(iteration + 1);

      switch (char) {
        /* {{ */
        case '{':
          if (nextChar === '{')
            parsedToken.push({
              type: HTMLTokenKind.OpenDoubleBrace,
              startOffset: iteration,
              tokenSize: 2,
            });
          iteration += 2;
          break;

        /* }} */
        case '}':
          if (nextChar === '}')
            parsedToken.push({
              type: HTMLTokenKind.CloseDoubleBrace,
              startOffset: iteration,
              tokenSize: 2,
            });
          iteration += 2;
          break;

        /* < */
        case '<':
          parsedToken.push({
            type: HTMLTokenKind.OpenAngleBracket,
            startOffset: iteration,
            tokenSize: 1,
          });
          iteration++;
          break;

        /* > */
        case '>':
          parsedToken.push({
            type: HTMLTokenKind.CloseAngleBracket,
            startOffset: iteration,
            tokenSize: 1,
          });
          iteration++;
          break;

        default:
          if (this.isLetter(char)) {
            const initialIterationValue = iteration;
            while (this.isLetter(chars[iteration])) {
              iteration++;
            }
            parsedToken.push({
              type: HTMLTokenKind.StrIdentifier,
              startOffset: initialIterationValue,
              tokenSize: iteration - initialIterationValue,
            });
          }

          if (!this.isLetter(char)) {
            iteration++;
          }
      }
    }

    return parsedToken;
  }

  private isLetter(char: string): boolean {
    return char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z';
  }
}
