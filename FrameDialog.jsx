#target photoshop
#include "FrameStylesDialog.jsx"
#include "FrameStyle.js"

function FrameDialog(app)
{
    this.app = app
    this.doc = app.activeDocument;
    this.DoFrame = false;

    this.FrameColor = null;
    this.FrameWidthFraction = null;
    this.BottomExtensionFraction = null;
    this.InnerOffset = null;
    this.InnerLineWidth = null;
    this.TextColor = null;
    this.Title = null;
    this.TitleSizeFraction = null;
    this.TitleXFraction = null;
    this.TitleYFraction = null;
    this.Owner = null;
    this.CopyrightYear = null;
    this.CopyrightSizeFraction = null;
    this.CopyrightXFraction = null;
    this.CopyrightYFraction = null;

    this.OriginalWidth = this.doc.width.as("px");
    this.OriginalHeight = this.doc.height.as("px");

    // All sizes stored as pixels.  Text sizes will be converted to points as needed.
    this.InnerOffsetSize = null;
    this.InnerLineSize = null;
    this.FrameWidthSize = null;
    this.BottomExtensionSize = null;
    this.TitleSize = null;
    this.TitleXPosition = null;  // pixels from left edge
    this.TitleYPosition = null;  // pixels from bottom
    this.CopyrightSize = null;
    this.CopyrightXPosition = null;
    this.CopyrightYPosition = null;

    this.Styles = {};
    this.StartupStyleName = null;
}

FrameDialog.prototype.SetFrameColor = function(color)
{
// color argument is an RGBColor object
    this.FrameColor = color;
    if (this.FrameColorHex.value == true)
    {
        this.FrameColorRElement.text = color.red.ToString(16);
        this.FrameColorGElement.text = color.green.ToString(16);
        this.FrameColorBElement.text = color.blue.ToString(16);
    }
    else
    {
        this.FrameColorRElement.text = color.red;
        this.FrameColorGElement.text = color.green;
        this.FrameColorBElement.text = color.blue ;
    }
}

FrameDialog.prototype.SetTextColor = function(color)
{
// color argument is an RGBColor object
    this.TextColor = color;
    if (this.TextColorHex.value == true)
    {
        this.TextColorRElement.text = color.red.ToString(16);
        this.TextColorGElement.text = color.green.ToString(16);
        this.TextColorBElement.text = color.blue.ToString(16);
    }
    else
    {
        this.TextColorRElement.text = color.red;
        this.TextColorGElement.text = color.green;
        this.TextColorBElement.text = color.blue ;
    }
}

FrameDialog.prototype.GetFrameColor = function()
{
    frameColor = new RGBColor();
    if (this.FrameColorHex.value == true)
    {
        frameColor.hexValue = this.FrameColorRElement.text +
                             this.FrameColorGElement.text +
                             this.FrameColorBElement.text;
    }
    else
    {
        frameColor.red = this.FrameColorRElement.text;
        frameColor.green = this.FrameColorGElement.text;
        frameColor.blue = this.FrameColorBElement.text;
    }
    this.FrameColor = frameColor;
}

FrameDialog.prototype.GetTextColor = function()
{
    textColor = new RGBColor();
    if (this.TextColorHex.value == true)
    {
        textColor.hexValue = this.TextColorRElement.text +
                             this.TextColorGElement.text +
                             this.TextColorBElement.text;
    }
    else
    {
        textColor.red = this.TextColorRElement.text;
        textColor.green = this.TextColorGElement.text;
        textColor.blue = this.TextColorBElement.text;
    }
    this.TextColor = textColor;
}

FrameDialog.prototype.ShowDialog = function()
{
    this.dialog.show();
}

// function ShowDialog(doc)
FrameDialog.prototype.CreateDialog = function()
{
    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select):
    {"activeId":25,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":true},"text":"Frame My Photo","preferredSize":[500,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-1":{"id":1,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"FrameGroup","preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"TextGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-3":{"id":3,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"TitleGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"CopyrightGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-5":{"id":5,"type":"Panel","parentId":1,"style":{"enabled":true,"varName":"FramePanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Frame","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-6":{"id":6,"type":"Panel","parentId":2,"style":{"enabled":true,"varName":"TextPanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Text","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-9":{"id":9,"type":"Group","parentId":5,"style":{"enabled":true,"varName":"FrameColorGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-10":{"id":10,"type":"Group","parentId":5,"style":{"enabled":true,"varName":"FrameSizeGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-12":{"id":12,"type":"Group","parentId":6,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-17":{"id":17,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"R:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"EditText","parentId":9,"style":{"enabled":true,"varName":"FrameColorRElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"G:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"EditText","parentId":9,"style":{"enabled":true,"varName":"FrameColorGElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-21":{"id":21,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"B:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-22":{"id":22,"type":"EditText","parentId":9,"style":{"enabled":true,"varName":"FrameColorBElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-23":{"id":23,"type":"Checkbox","parentId":9,"style":{"enabled":true,"varName":"FrameColorHex","text":"Hex","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-24":{"id":24,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-25":{"id":25,"type":"StaticText","parentId":24,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"All fractions are relative to image height","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-26":{"id":26,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Width fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-27":{"id":27,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"FrameWidthFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-28":{"id":28,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Bottom extension fraction: ","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-29":{"id":29,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"BottomExtensionFractonElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-30":{"id":30,"type":"Group","parentId":6,"style":{"enabled":true,"varName":"TextColorGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-31":{"id":31,"type":"StaticText","parentId":30,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"R:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-32":{"id":32,"type":"EditText","parentId":30,"style":{"enabled":true,"varName":"TextColorRElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-33":{"id":33,"type":"StaticText","parentId":30,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"G:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-34":{"id":34,"type":"EditText","parentId":30,"style":{"enabled":true,"varName":"TextColorGElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"StaticText","parentId":30,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"B:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-36":{"id":36,"type":"EditText","parentId":30,"style":{"enabled":true,"varName":"TextColorBElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[30,0],"alignment":null,"helpTip":null}},"item-37":{"id":37,"type":"Checkbox","parentId":30,"style":{"enabled":true,"varName":"TextColorHex","text":"Hex","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-38":{"id":38,"type":"Button","parentId":12,"style":{"enabled":true,"varName":"WhiteButton","text":"White","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-39":{"id":39,"type":"Button","parentId":12,"style":{"enabled":true,"varName":"BlackButton","text":"Black","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-50":{"id":50,"type":"Panel","parentId":3,"style":{"enabled":true,"varName":"TitlePanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"TitleElement","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":0,"alignChildren":["left","top"],"alignment":null}},"item-51":{"id":51,"type":"Group","parentId":50,"style":{"enabled":true,"varName":"TitleEntryGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-52":{"id":52,"type":"StaticText","parentId":51,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"TitleElement:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-53":{"id":53,"type":"EditText","parentId":51,"style":{"enabled":true,"varName":"TitleElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[500,0],"alignment":null,"helpTip":null}},"item-54":{"id":54,"type":"Group","parentId":50,"style":{"enabled":true,"varName":"TitleSizeGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-55":{"id":55,"type":"StaticText","parentId":54,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Size Fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-56":{"id":56,"type":"EditText","parentId":54,"style":{"enabled":true,"varName":"TitleSizeFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-57":{"id":57,"type":"Group","parentId":50,"style":{"enabled":true,"varName":"TitleXGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-58":{"id":58,"type":"StaticText","parentId":57,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"X Fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-59":{"id":59,"type":"EditText","parentId":57,"style":{"enabled":true,"varName":"TitleXFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-60":{"id":60,"type":"StaticText","parentId":57,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"(distance from left edge)","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-61":{"id":61,"type":"Group","parentId":50,"style":{"enabled":true,"varName":"TitleYGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-62":{"id":62,"type":"StaticText","parentId":61,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Y Fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-63":{"id":63,"type":"EditText","parentId":61,"style":{"enabled":true,"varName":"TitleYFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-64":{"id":64,"type":"StaticText","parentId":61,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"(distance from bottom edge)","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-65":{"id":65,"type":"Panel","parentId":4,"style":{"enabled":true,"varName":"CopyrightPanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Copyright","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":0,"alignChildren":["left","top"],"alignment":null}},"item-66":{"id":66,"type":"Group","parentId":65,"style":{"enabled":true,"varName":"TitleEntryGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-67":{"id":67,"type":"StaticText","parentId":66,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Copyright Year:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-68":{"id":68,"type":"EditText","parentId":66,"style":{"enabled":true,"varName":"CopyrightYearElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[50,0],"alignment":null,"helpTip":null}},"item-69":{"id":69,"type":"Group","parentId":65,"style":{"enabled":true,"varName":"TitleSizeGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-70":{"id":70,"type":"StaticText","parentId":69,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Size Fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-71":{"id":71,"type":"EditText","parentId":69,"style":{"enabled":true,"varName":"CopyrightSizeFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-72":{"id":72,"type":"Group","parentId":65,"style":{"enabled":true,"varName":"TitleXGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-73":{"id":73,"type":"StaticText","parentId":72,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"X Fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-74":{"id":74,"type":"EditText","parentId":72,"style":{"enabled":true,"varName":"CopyrightXFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-75":{"id":75,"type":"StaticText","parentId":72,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"(distance from left edge)","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-76":{"id":76,"type":"Group","parentId":65,"style":{"enabled":true,"varName":"TitleYGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-77":{"id":77,"type":"StaticText","parentId":76,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Y Fraction:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-78":{"id":78,"type":"EditText","parentId":76,"style":{"enabled":true,"varName":"CopyrightYFractionElement","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-79":{"id":79,"type":"StaticText","parentId":76,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"(distance from bottom edge)","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-80":{"id":80,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"OKCancelGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-81":{"id":81,"type":"Button","parentId":80,"style":{"enabled":true,"varName":null,"text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-82":{"id":82,"type":"Button","parentId":80,"style":{"enabled":true,"varName":null,"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,24,25,1,5,9,17,18,19,20,21,22,23,10,26,27,28,29,2,6,30,31,32,33,34,35,36,37,12,38,39,3,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,4,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
    */

    var frameStylesList;
    var frameStyle;

    try
    {
        var fileName = ".\\presets\\scripts\\frameStyles.xml";
        frameStylesList = new File(fileName);
        if (frameStylesList.open("r"))
        {
            var xmlStylesRoot = XML(frameStylesList.read());
            var startupStyle = xmlStylesRoot.descendants("StartupStyle");
            if (startupStyle != null)
            {
                this.StartupStyleName = startupStyle.@Style;
            }
            else
            {
                alert ("No startup style found.");
            }
            var xmlStyles = xmlStylesRoot.descendants("Style");
            for (i = 0; i < xmlStyles.length(); i++)
            {
                // this.Styles[xmlStyles[i].@name] = xmlStyles[i].@name;
                var styleName = xmlStyles[i].@Name;
                var newStyleObject = FrameStyle.FromXML(xmlStyles[i]);
                this.Styles[styleName] = newStyleObject;
            }
        }

    }
    catch (e)
    {
        alert ("Failed to open frame style list: " + e.message + " at file " + e.fileName + " line " + e.line);
    }

    // DIALOG
    // ======
   this.dialog = new Window("dialog", undefined, undefined, {closeButton: true});
        this.dialog.text = "Frame My Photo";
        this.dialog.preferredSize.width = 500;
        this.dialog.orientation = "column";
        this.dialog.alignChildren = ["fill","top"];
        this.dialog.spacing = 10;
        this.dialog.margins = 16;

    // GROUP1
    // ======
    this.group1 = this.dialog.add("group", undefined, {name: "group1"});
        this.group1.orientation = "row";
        this.group1.alignChildren = ["left","center"];
        this.group1.spacing = 10;
        this.group1.margins = 0;

    this.statictext1 = this.group1.add("statictext", undefined, undefined, {name: "statictext1"});
        this.statictext1.text = "All fractions are relative to image height";
        this.statictext1.justify = "center";

    // FRAMESTYLEGROUP
    // ===============
    this.FrameStyleGroup = this.dialog.add("group", undefined, {name: "FrameStyleGroup"});
        this.FrameStyleGroup.orientation = "row";
        this.FrameStyleGroup.alignChildren = ["left","center"];
        this.FrameStyleGroup.spacing = 10;
        this.FrameStyleGroup.margins = 0;

    this.statictext2 = this.FrameStyleGroup.add("statictext", undefined, undefined, {name: "statictext2"});
        this.statictext2.text = "Selected style: ";

    this.SelectedStyle = this.FrameStyleGroup.add('edittext {properties: {name: "SelectedStyle"}}');
        this.SelectedStyle.text = "None";
        this.SelectedStyle.preferredSize.width = 250;

    this.ManageStylesButton = this.FrameStyleGroup.add("button", undefined, undefined, {name: "ManageStylesButton"});
        this.ManageStylesButton.text = "Manage Styles";
        this.ManageStylesButton.addEventListener("click", this.OnManageStylesButtonClick);
        this.ManageStylesButton.tag = this;


    // FRAMEGROUP
    // ==========
    this.FrameGroup = this.dialog.add("group", undefined, {name: "FrameGroup"});
        this.FrameGroup.orientation = "column";
        this.FrameGroup.alignChildren = ["left","center"];
        this.FrameGroup.spacing = 10;
        this.FrameGroup.margins = 0;

    // FRAMEPANEL
    // ==========
    this.FramePanel = this.FrameGroup.add("panel", undefined, undefined, {name: "FramePanel"});
        this.FramePanel.text = "Frame";
        this.FramePanel.orientation = "column";
        this.FramePanel.alignChildren = ["left","top"];
        this.FramePanel.spacing = 10;
        this.FramePanel.margins = 10;

    // FRAMECOLORGROUP
    // ===============
    this.FrameColorGroup = this.FramePanel.add("group", undefined, {name: "FrameColorGroup"});
        this.FrameColorGroup.orientation = "row";
        this.FrameColorGroup.alignChildren = ["left","center"];
        this.FrameColorGroup.spacing = 10;
        this.FrameColorGroup.margins = 0;

    this.statictext2 = this.FrameColorGroup.add("statictext", undefined, undefined, {name: "statictext2"});
        this.statictext2.text = "R:";

    this.FrameColorRElement = this.FrameColorGroup.add('edittext {properties: {name: "FrameColorRElement"}}');
        this.FrameColorRElement.preferredSize.width = 30;
        this.FrameColorRElement.alignment = ["middle","center"];

    this.statictext3 = this.FrameColorGroup.add("statictext", undefined, undefined, {name: "statictext3"});
        this.statictext3.text = "G:";

    this.FrameColorGElement = this.FrameColorGroup.add('edittext {properties: {name: "FrameColorGElement"}}');
        this.FrameColorGElement.preferredSize.width = 30;

    this.statictext4 = this.FrameColorGroup.add("statictext", undefined, undefined, {name: "statictext4"});
        this.statictext4.text = "B:";

    this.FrameColorBElement = this.FrameColorGroup.add('edittext {properties: {name: "FrameColorBElement"}}');
        this.FrameColorBElement.preferredSize.width = 30;

    this.FrameColorHex = this.FrameColorGroup.add("checkbox", undefined, undefined, {name: "FrameColorHex"});
        this.FrameColorHex.text = "Hex";
/*
    this.doFrameButton = this.DoFrameGroup.add("button", undefined, undefined, {name: "doFrame"});
        this.doFrameButton.text = "Add Frame";
        this.doFrameButton.addEventListener("click", this.OnDoFrameClick);
        this.doFrameButton.tag = this;
*/
    this.FrameColorPicker = this.FrameColorGroup.add("button", undefined, undefined, {name: "FrameColorPicker"});
        this.FrameColorPicker.text = "Pick Color";
        this.FrameColorPicker.addEventListener("click", this.OnFrameColorPicker);
        this.FrameColorPicker.tag = this;

    // FRAMESIZEGROUP
    // ==============
    this.FrameSizeGroup = this.FramePanel.add("group", undefined, {name: "FrameSizeGroup"});
        this.FrameSizeGroup.orientation = "row";
        this.FrameSizeGroup.alignChildren = ["left","center"];
        this.FrameSizeGroup.spacing = 10;
        this.FrameSizeGroup.margins = 0;

    this.statictext5 = this.FrameSizeGroup.add("statictext", undefined, undefined, {name: "statictext5"});
        this.statictext5.text = "Width fraction:";

    this.FrameWidthFractionElement = this.FrameSizeGroup.add('edittext {properties: {name: "FrameWidthFractionElement"}}');
        this.FrameWidthFractionElement.preferredSize.width = 40;

    this.statictext6 = this.FrameSizeGroup.add("statictext", undefined, undefined, {name: "statictext6"});
        this.statictext6.text = "Bottom extension fraction: ";

    this.BottomExtensionFractonElement = this.FrameSizeGroup.add('edittext {properties: {name: "BottomExtensionFractonElement"}}');
        this.BottomExtensionFractonElement.preferredSize.width = 40;

    // INNEROFFSETGROUP
    // ================
    this.InnerOffsetGroup = this.FramePanel.add("group", undefined, {name: "InnerOffsetGroup"});
        this.InnerOffsetGroup.orientation = "row";
        this.InnerOffsetGroup.alignChildren = ["left","center"];
        this.InnerOffsetGroup.spacing = 10;
        this.InnerOffsetGroup.margins = 0;

    this.statictext7 = this.InnerOffsetGroup.add("statictext", undefined, undefined, {name: "statictext7"});
        this.statictext7.text = "Inner offset fraction: ";

    this.InnerOffsetElement = this.InnerOffsetGroup.add('edittext {properties: {name: "InnerOffsetElement"}}');
        this.InnerOffsetElement.preferredSize.width = 40;

    this.statictext8 = this.InnerOffsetGroup.add("statictext", undefined, undefined, {name: "statictext8"});
        this.statictext8.text = "Inner line width fraction:";

    this.InnerLineWidthElement = this.InnerOffsetGroup.add('edittext {properties: {name: "InnerLineWidthElement"}}');
        this.InnerLineWidthElement.preferredSize.width = 40;

    // TEXTGROUP
    // =========
    this.TextGroup = this.dialog.add("group", undefined, {name: "TextGroup"});
        this.TextGroup.orientation = "row";
        this.TextGroup.alignChildren = ["left","center"];
        this.TextGroup.spacing = 10;
        this.TextGroup.margins = 0;

    // TEXTPANEL
    // =========
    this.TextPanel = this.TextGroup.add("panel", undefined, undefined, {name: "TextPanel"});
        this.TextPanel.text = "Text";
        this.TextPanel.orientation = "column";
        this.TextPanel.alignChildren = ["left","top"];
        this.TextPanel.spacing = 10;
        this.TextPanel.margins = 10;

    // TEXTCOLORGROUP
    // ==============
    this.TextColorGroup = this.TextPanel.add("group", undefined, {name: "TextColorGroup"});
        this.TextColorGroup.orientation = "row";
        this.TextColorGroup.alignChildren = ["left","center"];
        this.TextColorGroup.spacing = 10;
        this.TextColorGroup.margins = 0;

    this.statictext7 = this.TextColorGroup.add("statictext", undefined, undefined, {name: "statictext7"});
        this.statictext7.text = "R:";

    this.TextColorRElement = this.TextColorGroup.add('edittext {properties: {name: "TextColorRElement"}}');
        this.TextColorRElement.preferredSize.width = 30;

    this.statictext8 = this.TextColorGroup.add("statictext", undefined, undefined, {name: "statictext8"});
        this.statictext8.text = "G:";

    this.TextColorGElement = this.TextColorGroup.add('edittext {properties: {name: "TextColorGElement"}}');
        this.TextColorGElement.preferredSize.width = 30;

    this.statictext9 = this.TextColorGroup.add("statictext", undefined, undefined, {name: "statictext9"});
        this.statictext9.text = "B:";

    this.TextColorBElement = this.TextColorGroup.add('edittext {properties: {name: "TextColorBElement"}}');
        this.TextColorBElement.preferredSize.width = 30;

    this.TextColorHex = this.TextColorGroup.add("checkbox", undefined, undefined, {name: "TextColorHex"});
        this.TextColorHex.text = "Hex";

    this.TextColorPicker = this.TextColorGroup.add("button", undefined, undefined, {name: "TextColorPicker"});
        this.TextColorPicker.text = "Pick Color";
        this.TextColorPicker.addEventListener("click", this.OnTextColorPicker);
        this.TextColorPicker.tag = this;

    // GROUP2
    // ======
    this.group2 = this.TextPanel.add("group", undefined, {name: "group2"});
        this.group2.orientation = "row";
        this.group2.alignChildren = ["left","center"];
        this.group2.spacing = 10;
        this.group2.margins = 0;

    this.WhiteButton = this.group2.add("button", undefined, undefined, {name: "WhiteButton"});
        this.WhiteButton.text = "White";
        this.WhiteButton.tag = this;
        this.WhiteButton.addEventListener("click", this.OnWhiteClick)

    this.BlackButton = this.group2.add("button", undefined, undefined, {name: "BlackButton"});
        this.BlackButton.text = "Black";
        this.BlackButton.tag = this;
        this.BlackButton.addEventListener("click", this.OnBlackClick)

    // TITLEGROUP
    // ==========
    this.TitleGroup = this.dialog.add("group", undefined, {name: "TitleGroup"});
        this.TitleGroup.orientation = "row";
        this.TitleGroup.alignChildren = ["left","center"];
        this.TitleGroup.spacing = 10;
        this.TitleGroup.margins = 0;

    // TITLEPANEL
    // ==========
    this.TitlePanel = this.TitleGroup.add("panel", undefined, undefined, {name: "TitlePanel"});
        this.TitlePanel.text = "Title";
        this.TitlePanel.orientation = "column";
        this.TitlePanel.alignChildren = ["left","top"];
        this.TitlePanel.spacing = 0;
        this.TitlePanel.margins = 10;

    // TITLEENTRYGROUP
    // ===============
    this.TitleEntryGroup = this.TitlePanel.add("group", undefined, {name: "TitleEntryGroup"});
        this.TitleEntryGroup.orientation = "row";
        this.TitleEntryGroup.alignChildren = ["left","center"];
        this.TitleEntryGroup.spacing = 10;
        this.TitleEntryGroup.margins = 0;

    this.statictext10 = this.TitleEntryGroup.add("statictext", undefined, undefined, {name: "statictext10"});
        this.statictext10.text = "Title:";

    this.TitleElement = this.TitleEntryGroup.add('edittext {properties: {name: "TitleElement"}}');
        this.TitleElement.preferredSize.width = 350;

    // TITLESIZEGROUP
    // ==============
    this.TitleSizeGroup = this.TitlePanel.add("group", undefined, {name: "TitleSizeGroup"});
        this.TitleSizeGroup.orientation = "row";
        this.TitleSizeGroup.alignChildren = ["left","center"];
        this.TitleSizeGroup.spacing = 10;
        this.TitleSizeGroup.margins = 0;

    this.statictext11 = this.TitleSizeGroup.add("statictext", undefined, undefined, {name: "statictext11"});
        this.statictext11.text = "Size Fraction:";

    this.TitleSizeFractionElement = this.TitleSizeGroup.add('edittext {properties: {name: "TitleSizeFractionElement"}}');
        this.TitleSizeFractionElement.preferredSize.width = 40;

    // TITLEXGROUP
    // ===========
    this.TitleXGroup = this.TitlePanel.add("group", undefined, {name: "TitleXGroup"});
        this.TitleXGroup.orientation = "row";
        this.TitleXGroup.alignChildren = ["left","center"];
        this.TitleXGroup.spacing = 10;
        this.TitleXGroup.margins = 0;

    this.statictext12 = this.TitleXGroup.add("statictext", undefined, undefined, {name: "statictext12"});
        this.statictext12.text = "X Fraction:";

    this.TitleXFractionElement = this.TitleXGroup.add('edittext {properties: {name: "TitleXFractionElement"}}');
        this.TitleXFractionElement.preferredSize.width = 40;

    this.statictext13 = this.TitleXGroup.add("statictext", undefined, undefined, {name: "statictext13"});
        this.statictext13.text = "(distance from left edge)";

    // TITLEYGROUP
    // ===========
    this.TitleYGroup = this.TitlePanel.add("group", undefined, {name: "TitleYGroup"});
        this.TitleYGroup.orientation = "row";
        this.TitleYGroup.alignChildren = ["left","center"];
        this.TitleYGroup.spacing = 10;
        this.TitleYGroup.margins = 0;

    this.statictext14 = this.TitleYGroup.add("statictext", undefined, undefined, {name: "statictext14"});
        this.statictext14.text = "Y Fraction:";

    this.TitleYFractionElement = this.TitleYGroup.add('edittext {properties: {name: "TitleYFractionElement"}}');
        this.TitleYFractionElement.preferredSize.width = 40;

    this.statictext15 = this.TitleYGroup.add("statictext", undefined, undefined, {name: "statictext15"});
        this.statictext15.text = "(distance from bottom edge)";

    // COPYRIGHTGROUP
    // ==============
    this.CopyrightGroup = this.dialog.add("group", undefined, {name: "CopyrightGroup"});
        this.CopyrightGroup.orientation = "row";
        this.CopyrightGroup.alignChildren = ["left","center"];
        this.CopyrightGroup.spacing = 10;
        this.CopyrightGroup.margins = 0;

    // COPYRIGHTPANEL
    // ==============
    this.CopyrightPanel = this.CopyrightGroup.add("panel", undefined, undefined, {name: "CopyrightPanel"});
        this.CopyrightPanel.text = "Copyright";
        this.CopyrightPanel.orientation = "column";
        this.CopyrightPanel.alignChildren = ["left","top"];
        this.CopyrightPanel.spacing = 0;
        this.CopyrightPanel.margins = 10;

    // COPYRIGHTOWNERGROUP
    // ===================
    this.CopyrightOwnerGroup = this.CopyrightPanel.add("group", undefined, {name: "CopyrightOwnerGroup"});
        this.CopyrightOwnerGroup.orientation = "row";
        this.CopyrightOwnerGroup.alignChildren = ["left","center"];
        this.CopyrightOwnerGroup.spacing = 10;
        this.CopyrightOwnerGroup.margins = 0;

    this.statictext18 = this.CopyrightOwnerGroup.add("statictext", undefined, undefined, {name: "statictext18"});
        this.statictext18.text = "Owner:";

    this.OwnerElement = this.CopyrightOwnerGroup.add('edittext {properties: {name: "OwnerElement"}}');
        this.OwnerElement.preferredSize.width = 350;
        this.OwnerElement.text = "Robert D. Richardson"

    // TITLEENTRYGROUP1
    // ================
    this.TitleEntryGroup1 = this.CopyrightPanel.add("group", undefined, {name: "TitleEntryGroup1"});
        this.TitleEntryGroup1.orientation = "row";
        this.TitleEntryGroup1.alignChildren = ["left","center"];
        this.TitleEntryGroup1.spacing = 10;
        this.TitleEntryGroup1.margins = 0;

    this.statictext16 = this.TitleEntryGroup1.add("statictext", undefined, undefined, {name: "statictext16"});
        this.statictext16.text = "Copyright Year:";

    this.CopyrightYearElement = this.TitleEntryGroup1.add('edittext {properties: {name: "CopyrightYearElement"}}');
        this.CopyrightYearElement.preferredSize.width = 50;

    // TITLESIZEGROUP1
    // ===============
    this.TitleSizeGroup1 = this.CopyrightPanel.add("group", undefined, {name: "TitleSizeGroup1"});
        this.TitleSizeGroup1.orientation = "row";
        this.TitleSizeGroup1.alignChildren = ["left","center"];
        this.TitleSizeGroup1.spacing = 10;
        this.TitleSizeGroup1.margins = 0;

    this.statictext17 = this.TitleSizeGroup1.add("statictext", undefined, undefined, {name: "statictext17"});
        this.statictext17.text = "Size Fraction:";

    this.CopyrightSizeFractionElement = this.TitleSizeGroup1.add('edittext {properties: {name: "CopyrightSizeFractionElement"}}');
        this.CopyrightSizeFractionElement.preferredSize.width = 40;

    // TITLEXGROUP1
    // ============
    this.TitleXGroup1 = this.CopyrightPanel.add("group", undefined, {name: "TitleXGroup1"});
        this.TitleXGroup1.orientation = "row";
        this.TitleXGroup1.alignChildren = ["left","center"];
        this.TitleXGroup1.spacing = 10;
        this.TitleXGroup1.margins = 0;

    this.statictext18 = this.TitleXGroup1.add("statictext", undefined, undefined, {name: "statictext18"});
        this.statictext18.text = "X Fraction:";

    this.CopyrightXFractionElement = this.TitleXGroup1.add('edittext {properties: {name: "CopyrightXFractionElement"}}');
        this.CopyrightXFractionElement.preferredSize.width = 40;

    this.statictext19 = this.TitleXGroup1.add("statictext", undefined, undefined, {name: "statictext19"});
        this.statictext19.text = "(distance from left edge)";

    // TITLEYGROUP1
    // ============
    this.TitleYGroup1 = this.CopyrightPanel.add("group", undefined, {name: "TitleYGroup1"});
        this.TitleYGroup1.orientation = "row";
        this.TitleYGroup1.alignChildren = ["left","center"];
        this.TitleYGroup1.spacing = 10;
        this.TitleYGroup1.margins = 0;

    this.statictext20 = this.TitleYGroup1.add("statictext", undefined, undefined, {name: "statictext20"});
        this.statictext20.text = "Y Fraction:";

    this.CopyrightYFractionElement = this.TitleYGroup1.add('edittext {properties: {name: "CopyrightYFractionElement"}}');
        this.CopyrightYFractionElement.preferredSize.width = 40;

    this.statictext21 = this.TitleYGroup1.add("statictext", undefined, undefined, {name: "statictext21"});
        this.statictext21.text = "(distance from bottom edge)";

    // DOFRAMEGROUP
    this.DoFrameGroup = this.dialog.add("group", undefined, {name: "DoFrameGroup"});
        this.DoFrameGroup.orientation = "column";
        this.DoFrameGroup.alignChildren = ["center","center"];
        this.DoFrameGroup.spacing = 10;
        this.DoFrameGroup.margins = 0;

    this.doFrameButton = this.DoFrameGroup.add("button", undefined, undefined, {name: "doFrame"});
        this.doFrameButton.text = "Add Frame";
        this.doFrameButton.addEventListener("click", this.OnDoFrameClick);
        this.doFrameButton.tag = this;

    this.resetFrameButton = this.DoFrameGroup.add("button", undefined, undefined, {name: "resetFrame"});
        this.resetFrameButton.text = "Reset Frame";
        this.resetFrameButton.addEventListener("click", this.OnResetFrameClick);
        this.resetFrameButton.tag = this;
        this.resetFrameButton.enabled = false;

    /*
    // OKCANCELGROUP
    // =============
    this.OKCancelGroup = this.dialog.add("group", undefined, {name: "OKCancelGroup"});
        this.OKCancelGroup.orientation = "row";
        this.OKCancelGroup.alignChildren = ["center","center"];
        this.OKCancelGroup.spacing = 10;
        this.OKCancelGroup.margins = 0;
    */

    this.okButton = this.DoFrameGroup.add("button", undefined, "OK", {name: "ok"});
        this.okButton.text = "OK";
        this.okButton.addEventListener("click", this.OKClick);
        this.okButton.tag = this;

    //  SET DEFAULT VALUES
    /*
    this.FrameColor = null;
    this.FrameWidthFraction = null;
    this.FrameBottomExtension = null;
    this.TextColor = null;
    this.Title = null;
    this.TitleSizeFraction = null;
    this.TitleXFraction = null;
    this.TitleYFraction = null;
    this.CopyrightYear = null;
    this.CopyrightSizeFraction = null;
    this.CopyrightXFraction = null;
    this.CopyrightYFraction = null;
    */

    // Set default frame color to gray
    if (this.FrameColor == null)
    {
        this.FrameColor = new RGBColor();
        this.FrameColor.hexValue = "505050";
        this.FrameColorHex.value = false;
        this.FrameColorRElement.text = 80;
        this.FrameColorBElement.text = 80;
        this.FrameColorGElement.text = 80;
    }
    // Set default text color to white
    if (this.TextColor == null)
    {
        this.TextColor = new RGBColor();
        this.TextColor.hexValue = "ffffff";
        this.TextColorRElement.text = 255;
        this.TextColorBElement.text = 255;
        this.TextColorGElement.text = 255;
        this.TextColorHex.value = false;
    }

    if (this.FrameWidthFraction == null)
    {
        this.FrameWidthFraction = 0.04;
    }
    this.FrameWidthFractionElement.text = this.FrameWidthFraction;

    if (this.BottomExtensionFraction == null)
    {
        this.BottomExtensionFraction = 0.035;
    }
    this.BottomExtensionFractonElement.text = this.BottomExtensionFraction;

    if (this.InnerOffset == null)
    {
        this.InnerOffset = 0.003;
    }
    this.InnerOffsetElement.text = this.InnerOffset;

    if (this.InnerLineWidth == null)
    {
        this.InnerLineWidth = 0.0025;
    }
    this.InnerLineWidthElement.text = this.InnerLineWidth;
    /*
    var titleSizeFraction = 0.03; // title is 0.03 times doc height
    var titleXFraction = 0.02; // title X coordinate is titleXFraction times doc height
    var titleYFraction = 0.035; // title Y coordinate is titleYFraction times doc height above bottom edge
    */
    if (this.Title == null)
    {
        this.Title = this.doc.name.split('.').slice(0, -1).join('.')
    }
    this.TitleElement.text = this.Title;
    if (this.TitleSizeFraction == null)
    {
        this.TitleSizeFraction = 0.025;
    }
    this.TitleSizeFractionElement.text = this.TitleSizeFraction;
    if (this.TitleXFraction == null)
    {
        this.TitleXFraction = 0.02;
    }
    this.TitleXFractionElement.text = this.TitleXFraction;

    if (this.TitleYFraction == null)
    {
        this.TitleYFraction = 0.03;
    }
    this.TitleYFractionElement.text = this.TitleYFraction;

/*
    var copyrightSizeFraction = 0.015;
    var copyrightXFraction = 0.02;
    var copyrightYFraction = 0.01;
*/
    if (this.CopyrightYear == null)
    {
        this.CopyrightYear = this.GetCreationYear();
    }
    this.CopyrightYearElement.text = this.CopyrightYear;

    if (this.CopyrightSizeFraction == null)
    {
        this.CopyrightSizeFraction = 0.015;
    }
    this.CopyrightSizeFractionElement.text = this.CopyrightSizeFraction;
    if (this.CopyrightXFraction == null)
    {
        this.CopyrightXFraction = 0.02;
    }
    this.CopyrightXFractionElement.text = this.CopyrightXFraction;

    if (this.CopyrightYFraction == null)
    {
        this.CopyrightYFraction = 0.01;
    }
    this.CopyrightYFractionElement.text = this.CopyrightYFraction;

    if (this.StartupStyleName != null)
    {
        this.UseStyle(this.StartupStyleName);
    }
    // dialog.show();
}

FrameDialog.prototype.UpdateSettings = function()
{
    // this.FrameColor = null;
    this.GetFrameColor();
    this.GetTextColor();

    this.FrameWidthFraction = parseFloat(this.FrameWidthFractionElement.text);
    this.FrameWidthSize = this.OriginalHeight * this.FrameWidthFraction;
    this.BottomExtensionFraction = parseFloat(this.BottomExtensionFractonElement.text);
    this.BottomExtensionSize = this.OriginalHeight * this.BottomExtensionFraction;
    this.InnerOffset = parseFloat(this.InnerOffsetElement.text);
    this.InnerOffsetSize = this.InnerOffset * this.OriginalHeight;
    this.InnerLineWidth = parseFloat(this.InnerLineWidthElement.text);
    this.InnerLineSize = this.InnerLineWidth * this.OriginalHeight;
    this.Title = this.TitleElement.text;
    this.TitleSizeFraction = parseFloat(this.TitleSizeFractionElement.text);
    this.TitleSize = this.TitleSizeFraction * this.OriginalHeight;
    this.TitleXFraction = parseFloat(this.TitleXFractionElement.text);
    this.TitleXPosition = this.TitleXFraction * this.OriginalHeight;
    this.TitleYFraction = parseFloat(this.TitleYFractionElement.text);
    this.TitleYPosition = this.TitleYFraction * this.OriginalHeight;
    this.Owner = this.OwnerElement.text;
    this.CopyrightYear = parseInt(this.CopyrightYearElement.text);
    this.CopyrightSizeFraction = parseFloat(this.CopyrightSizeFractionElement.text);
    this.CopyrightSize = this.CopyrightSizeFraction * this.OriginalHeight;
    this.CopyrightXFraction = parseFloat(this.CopyrightXFractionElement.text);
    this.CopyrightXPosition = this.CopyrightXFraction * this.OriginalHeight;
    this.CopyrightYFraction = parseFloat(this.CopyrightYFractionElement.text);
    this.CopyrightYPosition = this.CopyrightYFraction * this.OriginalHeight;
}

FrameDialog.prototype.GetCreationYear = function()
{
    creationYear = new Date().getFullYear();
    for (var i = 0; i < this.doc.info.exif.length; i++)
    {
        // exifInfo = exifInfo + this.doc.info.exif[i][0] + " = " + this.doc.info.exif[i][1] + "\r";
        if (this.doc.info.exif[i][0] == "Date Time Original")
        {
            dateString =  this.doc.info.exif[i][1]
            creationYear = dateString.substr(0, 4);
            break;
        }
    }
    return creationYear;
}

FrameDialog.prototype.OKClick = function(e)
{
    e.target.tag.DoFrame = true;
}

FrameDialog.prototype.OnWhiteClick = function(e)
{
    if (e.target.tag.TextColorHex.value)
    {
        e.target.tag.TextColorRElement.text = "ff";
        e.target.tag.TextColorGElement.text = "ff";
        e.target.tag.TextColorBElement.text = "ff";
    }
    else
    {
        e.target.tag.TextColorRElement.text = "255";
        e.target.tag.TextColorGElement.text = "255";
        e.target.tag.TextColorBElement.text = "255";
    }
}

FrameDialog.prototype.OnBlackClick = function(e)
{
    e.target.tag.TextColorRElement.text = "00";
    e.target.tag.TextColorGElement.text = "00";
    e.target.tag.TextColorBElement.text = "00";
}

FrameDialog.prototype.OnFrameColorPicker = function(e)
{
    if (app.showColorPicker())
    {
        var newColor = app.foregroundColor;
        e.target.tag.SetFrameColor(newColor.rgb)
        e.target.tag.FrameColorPicker.backgroundColor = newColor;
    }
}

FrameDialog.prototype.OnManageStylesButtonClick = function(e)
{
    var stylesDialog = new FrameStylesDialog(e.target.tag);
    stylesDialog.CreateDialog();
    stylesDialog.ShowDialog();
}

FrameDialog.prototype.OnTextColorPicker = function(e)
{
    if (app.showColorPicker())
    {
        var newColor = app.foregroundColor;
        e.target.tag.SetTextColor(newColor.rgb)
    }
}

FrameDialog.prototype.OnDoFrameClick = function(e)
{
    e.target.tag.doFrameButton.enabled = false;
    e.target.tag.resetFrameButton.enabled = true;
    e.target.tag.DrawFrame(e.target.tag);
}

FrameDialog.prototype.OnResetFrameClick = function(e)
{
    e.target.tag.doFrameButton.enabled = true;
    e.target.tag.resetFrameButton.enabled = false;

    // e.target.tag.doc.artLayers.removeAll();
    var layers = e.target.tag.doc.artLayers;  // typing shortcut
    var layer = layers.getByName("Copyright");
    layer.remove();
    layer = layers.getByName("Title");
    layer.remove();
    layer = layers.getByName("Main Frame");
    layer.remove();
    layer = layers.getByName("Inner Line");
    layer.remove();
    layer = layers.getByName("Inner Offset");
    layer.remove();

    var doc = e.target.tag.doc;
    var dialog = e.target.tag;
    doc.resizeCanvas(UnitValue(doc.width, "px"),
                    UnitValue(doc.height - dialog.BottomExtensionSize, "px"),
                    AnchorPosition.TOPCENTER);
    doc.resizeCanvas(UnitValue(dialog.OriginalWidth, "px"),
                     UnitValue(dialog.OriginalHeight, "px"));
}

FrameDialog.prototype.DrawFrame = function()
{
    this.UpdateSettings();

    this.doc.resizeCanvas(UnitValue(this.doc.width + this.InnerOffsetSize, "px"),
                     UnitValue(this.doc.height + this.InnerOffsetSize, "px"));

    try
    {
        var newLayer = this.doc.artLayers.add();
        newLayer.kind = LayerKind.NORMAL;
        newLayer.name = "Inner Offset";
        this.doc.activeLayer = newLayer;
        // doc.selection.select([[10, 10], [494, 10], [494, 350], [10,350]], SelectionType.REPLACE, 0, false);
        this.doc.selection.selectAll();
        this.doc.selection.stroke (this.FrameColor, this.InnerOffsetSize / 2,
                                    StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100);
        this.doc.selection.deselect();
    }
    catch (e)
    {
        alert ("Failed to draw inner offset frame: " + e.message);
    }

    this.doc.resizeCanvas(UnitValue(this.doc.width + this.InnerLineSize, "px"),
                     UnitValue(this.doc.height + this.InnerLineSize, "px"));

    lineColor = new RGBColor();
    lineColor.hexValue = "ffffff";

    try
    {
        var newLayer = this.doc.artLayers.add();
        newLayer.kind = LayerKind.NORMAL;
        newLayer.name = "Inner Line";
        this.doc.activeLayer = newLayer;
        // doc.selection.select([[10, 10], [494, 10], [494, 350], [10,350]], SelectionType.REPLACE, 0, false);
        this.doc.selection.selectAll();
        this.doc.selection.stroke (lineColor, this.InnerLineSize / 2,
                                    StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100);
        this.doc.selection.deselect();
    }
    catch (e)
    {
        alert ("Failed to draw inner line: " + e.message);
    }

    this.doc.resizeCanvas(UnitValue(this.doc.width + this.FrameWidthSize, "px"),
                     UnitValue(this.doc.height + this.FrameWidthSize, "px"));

    try
    {
        var newLayer = this.doc.artLayers.add();
        newLayer.kind = LayerKind.NORMAL;
        newLayer.name = "Main Frame";
        this.doc.activeLayer = newLayer;
        // doc.selection.select([[10, 10], [494, 10], [494, 350], [10,350]], SelectionType.REPLACE, 0, false);
        this.doc.selection.selectAll();
        this.doc.selection.stroke (this.FrameColor, this.FrameWidthSize / 2,
                                    StrokeLocation.INSIDE, ColorBlendMode.NORMAL, 100);
        this.doc.selection.deselect();

//        doc.resizeCanvas(UnitValue(this.doc.width,"px"),
//                           UnitValue(thisdoc.height + frameBottomExtension,"px"),
//                           AnchorPosition.TOPCENTER);
        var heightBeforeExtension = this.doc.height;
        var widthBeforeExtension = this.doc.width;
        this.doc.resizeCanvas(UnitValue(this.doc.width, "px"),
                            UnitValue(this.doc.height + this.BottomExtensionSize, "px"),
                            AnchorPosition.TOPCENTER);

        var selectionLeft = 0;
        var selectionTop = this.doc.height.as("px") - this.BottomExtensionSize;
        var selectionRight = this.doc.width.as("px");
        var selectionBottom = this.doc.height.as("px");
        var selectionRegion = [selectionLeft, selectionTop, selectionRight, selectionBottom];

        /*
        You need an array.

        var docRef = app.activeDocument;

        //(topleft, bottomleft, bottomright, topright)
        // Coordinates are in [x, y] (horizontal, vertical) order
        var shapeRef = [ [10,10], [10,90], [90,90], [90,10] ];
        docRef.selection.select(shapeRef);
        */

        // this.doc.selection.select(selectionRegion);
        try
        {
            this.doc.selection.select([ [selectionLeft, selectionTop],
                                        [selectionLeft, selectionBottom],
                                        [selectionRight, selectionBottom],
                                        [selectionRight, selectionTop] ]);
            this.doc.selection.fill(this.FrameColor);
        }
        catch (e)
        {
            alert ("Error setting the selection: " + e.message);
        }

        // Title Y position is measured in pixels above the bottom edge
        CreateTextLayer(this.doc, "Title", this.Title, Justification.LEFT,
                         this.TextColor, this.TitleSize, this.TitleXPosition,
                         this.doc.height.as("px") - this.TitleYPosition);
        var copyrightString = "\u00A9 Copyright " + this.CopyrightYear +
                                " " + this.Owner + ".  All rights reserved.";

        CreateTextLayer(this.doc, "Copyright", copyrightString,Justification.LEFT,
                        this.TextColor, this.CopyrightSize, this.CopyrightXPosition,
                        this.doc.height.as("px") - this.CopyrightYPosition);

    }
    catch (e)
    {
        alert ("Failed to draw main frame: " + e.message);
    }


/*
    // Calculate title values now that the frame size has been adjusted
    var titleSize = this.doc.height * this.titleSizeFraction;
    var titleX = this.doc.height * this.titleXFraction;
    var titleY = this.doc.height * (1 - titleYFraction);

    var copyrightSize = this.doc.height * this.copyrightSizeFraction;
    var copyrightX = this.doc.height * this.copyrightXFraction;
    var copyrightY = this.doc.height * (1 - this.copyrightYFraction);

    // Add title
    CreateTextLayer(this.doc, "Title", this.Title, Justification.LEFT,
                     this.TextColor, titleSize, titleX, titleY);
    var copyrightString = "\u00A9 Copyright " + this.CopyrightYear + " by Robert D. Richardson.  All rights reserved.";
    CreateTextLayer(this.doc, "Copyright", copyrightString, Justification.LEFT,
                    this.TextColor, copyrightSize, copyrightX, copyrightY);
*/
}

function CreateTextLayer(document, layerName, content, justification,
                         color, size, distanceFromLeft, distanceFromTop)
{
    // var textColor = color
    var textColor = new SolidColor()
    textColor.rgb = color;

    if (typeof(color) == "undefined")
    {
        textColor = new SolidColor();
        textColor.rgb.red = 0;
        textColor.rgb.green = 0;
        textColor.rgb.blue = 0;
    }

    // make the layer;
    var myLayerRef = document.artLayers.add();
    myLayerRef.kind = LayerKind.TEXT;
    myLayerRef.name = layerName;

    var myTextRef = myLayerRef.textItem;
    // myTextRef.size = size;
    myTextRef.size = GetTextSize(document, size);
    myTextRef.font = "Myriad Pro";
    myTextRef.justification = justification;

    myTextRef.color = textColor;

    // Set the position of the text - percentages from left first, then from top.
    textXPosition = UnitValue(distanceFromLeft, "px");
    textYPosition = UnitValue(distanceFromTop, "px");
    myTextRef.position = new Array(textXPosition, textYPosition);
    myLayerRef.blendMode = BlendMode.NORMAL;
    myLayerRef.opacity = 100;
    myTextRef.contents = content;
}


function GetTextSize(document, pixelSize)
{
    // PhotoShop scripts only work in points (1/72nd of an inch).  So, if we want to specify text size in pixels,
    // we need to get the resolution of the image (pixels/inch), find out how many inches the given pixel size is,
    // and convert that to points by multiplying by 72.originalUnits
    targetInInches = pixelSize / document.resolution;
    var sizeInPoints = targetInInches * 72;
    return sizeInPoints;
}

function ParseXML(xmlString)
{
    var xmlObject = XML(xmlString)
    var loopCount = 1
    var d = xmlObject.descendants("heading");
    alert ("Descendents: " + d);
}

FrameDialog.prototype.DeleteStyle = function(styleName)
{
    var tempStylesDict = {}
    for (var oldStyleName in this.Styles)
    {
        if (this.Styles[oldStyleName].Name != styleName)
        {
            tempStylesDict[oldStyleName] = this.Styles[oldStyleName];
        }
    }
    this.Styles = tempStylesDict;

    this.SaveStylesToFile();
}

FrameDialog.prototype.UpdateStyle = function(styleName)
{
    alert ("Updating style " + styleName);
    this.UpdateSettings();
    var style = this.Styles[styleName];
    alert ("Found style " + style.Name);
    style.FrameColor = this.FrameColor;
    style.FrameWidthFraction = this.FrameWidthFraction;
    style.BottomExtensionFraction = this.BottomExtensionFraction;
    style.InnerOffset = this.InnerOffset;
    style.InnerLineWidth = this.InnerLineWidth;
    style.TextColor = this.TextColor;
    style.Title = this.Title
    style.TitleSizeFraction = this.TitleSizeFraction;
    style.TitleXFraction = this.TitleXFraction;
    style.TitleYFraction = this.TitleYFraction;
    style.Owner = this.Owner;
    style.CopyrightYear = this.CopyrightYear;
    style.CopyrightSizeFraction = this.CopyrightSizeFraction
    style.CopyrightXFraction = this.CopyrightXFraction
    style.CopyrightYFraction = this.CopyrightYFraction
    this.SaveStylesToFile();
}

FrameDialog.prototype.AddStyle = function(styleName)
{
    this.UpdateSettings();

    var newStyle = new FrameStyle();
    newStyle.Name = styleName;
    newStyle.FrameColor = this.FrameColor;
    newStyle.FrameWidthFraction = this.FrameWidthFraction;
    newStyle.BottomExtensionFraction = this.BottomExtensionFraction;
    newStyle.InnerOffset = this.InnerOffset;
    newStyle.InnerLineWidth = this.InnerLineWidth;
    newStyle.TextColor = this.TextColor;
    newStyle.Title = this.Title
    newStyle.TitleSizeFraction = this.TitleSizeFraction;
    newStyle.TitleXFraction = this.TitleXFraction;
    newStyle.TitleYFraction = this.TitleYFraction;
    newStyle.Owner = this.Owner;
    newStyle.CopyrightYear = this.CopyrightYear;
    newStyle.CopyrightSizeFraction = this.CopyrightSizeFraction
    newStyle.CopyrightXFraction = this.CopyrightXFraction
    newStyle.CopyrightYFraction = this.CopyrightYFraction

    this.Styles[styleName] = newStyle;
    this.SaveStylesToFile();
}

FrameDialog.prototype.SaveStylesToFile = function()
{
    var stylesXML = new XML("<FrameStyles>");
    if (this.StartupStyleName != null)
    {
        var startupXML = new XML("<StartupStyle>");
        startupXML.@Style = this.StartupStyleName;
        stylesXML.appendChild(startupXML);
    }
    for (var styleName in this.Styles)
    {
        var styleXML = this.Styles[styleName].ToXML();
        stylesXML.appendChild(styleXML);
    }

    try
    {
        var fileName = ".\\presets\\scripts\\frameStyles.xml";
        frameStylesList = new File(fileName);
        if (frameStylesList.open("w"))
        {
            frameStylesList.write(stylesXML);
            frameStylesList.close();
        }
        else
        {
            alert ("Could not open frame styles list file.");
        }
    }
    catch (e)
    {
        alert ("Exception when writing frame styles list file: " + e.message);
    }
}

FrameDialog.prototype.UseStyle = function(styleName)
{
    var selectedStyle = this.Styles[styleName];
    if (selectedStyle == null)
    {
        alert ("Request received to use style named " + styleName + " but that style does not exist.");
    }
    else
    {
        this.SetFrameColor(selectedStyle.FrameColor);
        this.FrameWidthFractionElement.text = selectedStyle.FrameWidthFraction;
        this.BottomExtensionFractonElement.text = selectedStyle.BottomExtensionFraction;
        this.InnerOffsetElement.text = selectedStyle.InnerOffset;
        this.InnerLineWidthElement.text = selectedStyle.InnerLineWidth;
        this.SetTextColor(selectedStyle.TextColor);
        this.TitleSizeFractionElement.text = selectedStyle.TitleSizeFraction;
        this.TitleXFractionElement.text = selectedStyle.TitleXFraction;
        this.TitleYFractionElement.text = selectedStyle.TitleYFraction;
        this.OwnerElement.text = selectedStyle.Owner;
        this.CopyrightSizeFractionElement.text = selectedStyle.CopyrightSizeFraction;
        this.CopyrightXFractionElement.text = selectedStyle.CopyrightXFraction;
        this.CopyrightYFractionElement.text = selectedStyle.CopyrightYFraction;
        this.SelectedStyle.text = styleName;
    }
}

FrameDialog.prototype.UseStyleOnStartup = function(styleName)
{
    alert ("Using sytle " + styleName + " on startup.");
    this.StartupStyleName = styleName;
    this.SaveStylesToFile();
}

