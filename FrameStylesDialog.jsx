#target photoshop

function FrameStylesDialog(frameDialog)
{
    this.MainDialog = frameDialog;
}

FrameStylesDialog.prototype.CreateDialog = function()
{
// NOTE:  Only one dialog can be created per browser, so this dialog was created in Vivaldi
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":0,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"ManageStylesDialog","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Frame Styles","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"ManageStylesGroup","preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"DropDownList","parentId":1,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-3":{"id":3,"type":"Group","parentId":1,"style":{"enabled":true,"varName":"CurrentSelectionGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-4":{"id":4,"type":"StaticText","parentId":3,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Current Selection:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"StaticText","parentId":3,"style":{"enabled":true,"varName":"CurrentSelectionLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Current Style","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,3,4,5,2],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

    // MANAGESTYLESDIALOG
    // ==================
    this.ManageStylesDialog = new Window("dialog", undefined, undefined, {closeButton: true});
        this.ManageStylesDialog.text = "Frame Styles";
        this.ManageStylesDialog.orientation = "column";
        this.ManageStylesDialog.alignChildren = ["center","top"];
        this.ManageStylesDialog.spacing = 10;
        this.ManageStylesDialog.margins = 16;

    // MANAGESTYLESGROUP
    // =================
    this.ManageStylesGroup = this.ManageStylesDialog.add("group", undefined, {name: "ManageStylesGroup"});
        this.ManageStylesGroup.orientation = "column";
        this.ManageStylesGroup.alignChildren = ["left","center"];
        this.ManageStylesGroup.spacing = 10;
        this.ManageStylesGroup.margins = 0;

    // AVAILABLESTYLESGROUP
    // =====================
    this.AvailableStylesGroup = this.ManageStylesGroup.add("group", undefined, {name: "AvailableStylesGroup"});
        this.AvailableStylesGroup.orientation = "row";
        this.AvailableStylesGroup.alignChildren = ["left","center"];
        this.AvailableStylesGroup.spacing = 10;
        this.AvailableStylesGroup.margins = 0;

    this.statictext2 = this.AvailableStylesGroup.add("statictext", undefined, undefined, {name: "statictext2"});
        this.statictext2.text = "Available Styles:";

    this.dropdown1 = this.AvailableStylesGroup.add("dropdownlist", undefined, undefined,
                                                {name: "dropdown1", items: this.GetStyleList()});
        this.dropdown1.selection = 0;
        this.dropdown1.addEventListener("change", this.OnStyleDropdownChanged);
        this.dropdown1.tag = this;

    this.SelectButton = this.AvailableStylesGroup.add("button", undefined, undefined, {name: "SelectButton"});
        this.SelectButton.text = "Select Style";
        this.SelectButton.addEventListener("click", OnSelectButtonClicked);
        this.SelectButton.tag = this;

    this.DeleteButton = this.AvailableStylesGroup.add("button", undefined, undefined, {name: "DeleteButton"});
        this.DeleteButton.text = "Delete Style";
        this.DeleteButton.addEventListener("click", this.OnDeleteButtonClicked);
        this.DeleteButton.tag = this;


    // CURRENTSELECTIONGROUP
    // =====================
    this.CurrentSelectionGroup = this.ManageStylesGroup.add("group", undefined, {name: "CurrentSelectionGroup"});
        this.CurrentSelectionGroup.orientation = "row";
        this.CurrentSelectionGroup.alignChildren = ["left","center"];
        this.CurrentSelectionGroup.spacing = 10;
        this.CurrentSelectionGroup.margins = 0;

    this.statictext1 = this.CurrentSelectionGroup.add("statictext", undefined, undefined, {name: "statictext1"});
        this.statictext1.text = "Active style:";

    this.CurrentSelectionLabel = this.CurrentSelectionGroup.add("edittext", undefined, undefined, {name: "CurrentSelectionLabel"});
        this.CurrentSelectionLabel.text = "";
        this.CurrentSelectionLabel.preferredSize.width = 250;

    // UPDATEACTIVESTYLEGROUP
    // ===========
    this.UpdateActiveStyleGroup = this.ManageStylesGroup.add("group", undefined, {name: "AvailableStylesGroup"});
        this.UpdateActiveStyleGroup.orientation = "row";
        this.UpdateActiveStyleGroup.alignChildren = ["left","center"];
        this.UpdateActiveStyleGroup.spacing = 10;
        this.UpdateActiveStyleGroup.margins = 0;

    this.UpdateButton = this.UpdateActiveStyleGroup.add("button", undefined, undefined, {name: "UpdateButton"});
        this.UpdateButton.text = "Update Active Style";
        this.UpdateButton.addEventListener("click", OnUpdateButtonClicked);
        this.UpdateButton.tag = this;

    this.UseOnStartupButton = this.UpdateActiveStyleGroup.add("button", undefined, undefined, {name: "UseOnStartupButton"});
        this.UseOnStartupButton.text = "Use Active On Startup";
        this.UseOnStartupButton.addEventListener("click", OnUseOnStartupClicked);
        this.UseOnStartupButton.tag = this;


    // ADDGROUP
    // ===========
    this.AddGroup = this.ManageStylesGroup.add("group", undefined, {name: "AddGroup"});
        this.AddGroup.orientation = "row";
        this.AddGroup.alignChildren = ["left","center"];
        this.AddGroup.spacing = 10;
        this.AddGroup.margins = 0;

    this.statictext3 = this.AddGroup.add("statictext", undefined, undefined, {name: "statictext3"});
        this.statictext3.text = "New style name:";

    this.NewStyleName = this.AddGroup.add("edittext", undefined, undefined, {name: "NewStyleName"});
        this.NewStyleName.text = "";
        this.NewStyleName.preferredSize.width = 250;

    this.AddButton = this.AddGroup.add("button", undefined, undefined, {name: "AddButton"});
        this.AddButton.text = "Add";
        this.AddButton.addEventListener("click", this.OnAddButtonClicked);
        this.AddButton.tag = this;

    // if (this.MainDialog.)
    // this.BuildXMLFromList(this.dropdown1.items);
    this.CurrentSelectionLabel.text = this.MainDialog.SelectedStyle.text;

}

/*
FrameStylesDialog.prototype.BuildXMLFromList = function(stylesList)
{
    var newXML = XML("<FrameStyles>");
    for (i = 0; i < stylesList.length; i++)
    {
        var styleNode = XML("<Style>");
        styleNode.@name = stylesList[i];
        newXML.appendChild(styleNode);
    }
}
*/

FrameStylesDialog.prototype.OnDeleteButtonClicked = function(e)
{
/*
    var dialog = e.target.tag;
    var selectionNum = dialog.dropdown1.selection.index;
    var selectedText = dialog.dropdown1.items[selectionNum].text;
    dialog.CurrentSelectionLabel.text = selectedText;
    dialog.MainDialog.UseStyle(selectedText);
*/
    var dialog = e.target.tag;
    var selectionNum = dialog.dropdown1.selection.index;
    var selectedText = dialog.dropdown1.items[selectionNum].text;
    if (confirm("Do you really want to delete style " + selectedText + "?"))
    {
        dialog.dropdown1.remove(selectedText);
        dialog.MainDialog.DeleteStyle(selectedText);
        dialog.CurrentSelectionLabel.text = "";
    }
}

FrameStylesDialog.prototype.OnAddButtonClicked = function(e)
{
    var dialog = e.target.tag;
    var foundItem = dialog.dropdown1.find(dialog.NewStyleName.text);
    if (foundItem != null)
    {
        alert("A style named " + foundItem.text + " already exists.");
        return;
    }

    dialog.MainDialog.AddStyle(dialog.NewStyleName.text);
    dialog.dropdown1.add('item', dialog.NewStyleName.text);
}

function OnUpdateButtonClicked(e)
{
    var dialog = e.target.tag;
    if (dialog.CurrentSelectionLabel.text == "" || dialog.CurrentSelectionLabel.text == null)
    {
        alert ("No style has been selected.");
    }
    else
    {
        dialog.MainDialog.UpdateStyle(dialog.CurrentSelectionLabel.text);
    }
}

FrameStylesDialog.prototype.ShowDialog = function()
{
    this.ManageStylesDialog.show();
}

FrameStylesDialog.prototype.OnStyleDropdownChanged = function(e)
{
/*
    var dialog = e.target.tag;
    var selectionNum = dialog.dropdown1.selection.index;
    var selectedText = dialog.dropdown1.items[selectionNum].text;
    dialog.CurrentSelectionLabel.text = selectedText;
    dialog.MainDialog.UseStyle(selectedText);
    dialog.CurrentSelectionLabel.text = selectedText;
*/
}

FrameStylesDialog.prototype.GetStyleList = function()
{
    var stylesList = [];
    for (var styleName in this.MainDialog.Styles)
    {
        stylesList.push(styleName);
    }
    return stylesList;
}

function OnSelectButtonClicked(e)
{
    var dialog = e.target.tag;
    var selectionNum = dialog.dropdown1.selection.index;
    var selectedText = dialog.dropdown1.items[selectionNum].text;
    dialog.CurrentSelectionLabel.text = selectedText;
    dialog.MainDialog.UseStyle(selectedText);
}

function OnUseOnStartupClicked(e)
{
    var dialog = e.target.tag;
    styleName = dialog.CurrentSelectionLabel.text;
    dialog.MainDialog.UseStyleOnStartup(styleName);
}