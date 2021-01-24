#target photoshop
#include "FrameDialog.jsx"

document = app.activeDocument;
document.changeMode(ChangeMode.RGB);
var originalUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
// doc.resizeImage (undefined, undefined, 300, ResampleMethod.NONE)

try
{
    var frameDialog = new FrameDialog(app);
    frameDialog.CreateDialog();
    frameDialog.ShowDialog();
}
catch (e)
{
    alert ("Oops! Error: " + e.message + "\nin file " + e.fileName + " at line " + e.line);
}
app.preferences.rulerUnits = originalUnits;

