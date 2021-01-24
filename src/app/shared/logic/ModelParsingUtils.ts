export class ModelParsingUtils {
  static getFixedHexColor(color: string): string {
    if (color.includes('#')) return color;
    return '#' + color;
  }
}
