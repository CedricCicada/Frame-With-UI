function FrameStyle()
{
    this.Name = null;
    this.FrameColor = null;
    this.FrameWidthFraction = null;
    this.BottomExtensionFraction = null;
    this.InnerOffset = null;
    this.InnerLineWidth = null;
    this.TextColor = null;
    this.TitleSizeFraction = null;
    this.TitleXFraction = null;
    this.TitleYFraction = null;
    this.Owner = null;
    this.CopyrightSizeFraction = null;
    this.CopyrightXFraction = null;
    this.CopyrightYFraction = null;

}

FrameStyle.FromXML = function(XMLelement)
{
    var style = new FrameStyle();
    style.Name = XMLelement.@Name;
    var frameColor = new RGBColor();
    frameColor.hexValue = XMLelement.@FrameColor;
    style.FrameColor = frameColor;
    style.FrameWidthFraction = XMLelement.@FrameWidthFraction;
    style.BottomExtensionFraction = XMLelement.@BottomExtensionFraction;
    style.InnerOffset = XMLelement.@InnerOffset;
    style.InnerLineWidth = XMLelement.@InnerLineWidth;
    var textColor = new RGBColor();
    textColor.hexValue = XMLelement.@TextColor;
    style.TextColor = textColor;
    style.TitleSizeFraction = XMLelement.@TitleSizeFraction;
    style.TitleXFraction = XMLelement.@TitleXFraction;
    style.TitleYFraction = XMLelement.@TitleYFraction;
    style.Owner = XMLelement.@Owner;
    style.CopyrightSizeFraction = XMLelement.@CopyrightSizeFraction;
    style.CopyrightXFraction = XMLelement.@CopyrightXFraction;
    style.CopyrightYFraction = XMLelement.@CopyrightYFraction;
    return style;
}

FrameStyle.prototype.ToXML = function()
{
    var XMLelement = new XML("<Style>");
    XMLelement.@Name = this.Name;
    XMLelement.@FrameColor = this.FrameColor.hexValue;
    XMLelement.@FrameWidthFraction = this.FrameWidthFraction;
    XMLelement.@BottomExtensionFraction = this.BottomExtensionFraction;
    XMLelement.@InnerOffset = this.InnerOffset;
    XMLelement.@InnerLineWidth = this.InnerLineWidth;
    XMLelement.@TextColor = this.TextColor.hexValue;
    XMLelement.@TitleSizeFraction = this.TitleSizeFraction;
    XMLelement.@TitleXFraction = this.TitleXFraction;
    XMLelement.@TitleYFraction = this.TitleYFraction;
    XMLelement.@Owner = this.Owner;
    XMLelement.@CopyrightSizeFraction = this.CopyrightSizeFraction;
    XMLelement.@CopyrightXFraction = this.CopyrightXFraction;
    XMLelement.@CopyrightYFraction = this.CopyrightYFraction;
    return XMLelement;
}

FrameStyle.prototype.toString = function()
{
    var styleText = "Name: " + this.Name + "\n" +
                    "Frame color: " + this.FrameColor.hexValue + "\n" +
                    "Frame width fraction: " + this.FrameWidthFraction + "\n" +
                    "Bottom extension fraction: " + this.BottomExtensionFraction + "\n" +
                    "Inner offset: " + this.InnerOffset + "\n" +
                    "Inner line width: " + this.InnerLineWidth + "\n" +
                    "Text color: " + this.TextColor.hexValue + "\n" +
                    "Title size fraction: " + this.TitleSizeFraction + "\n" +
                    "Title X fraction: " + this.TitleXFraction + "\n" +
                    "Title Y fraction: " + this.TitleYFraction + "\n" +
                    "Owner: " + this.Owner + "\n" +
                    "Copyright size fraction: " + this.CopyrightSizeFraction + "\n" +
                    "Copyright X fraction: " + this.CopyrightXFraction + "\n" +
                    "Copyright Y fraction: " + this.CopyrightYFraction + "\n";
    return styleText;
}