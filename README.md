# Frame-With-UI

A PhotoShop action can be handy, but it is severely limited.  Most choices are pre-made.  If any choices can be made as the action is running, they can only be made one at a time.  There is no way to save choices for future use.  Editing actions is an extremely cumbersome process.

PhotoShop has the ability to run scripts written in JavaScript, and those scripts can have dialog boxes in which users can make selections before the script begins applying choices to the image.  The Frame With UI (user interface) script is an example.  All parameters of the frame can be selected before the frame is generated.  If you don't like how the frame looks, you can click "Reset Frame" to restore the image to its original appearance.  Frame styles can be saved, and previosly saved styles can be loaded.  

To install this script, copy the .js and .jsx files into your PhotoShop scripts folder.  On my computer, that folder is C:/Program Files/Adobe/Adobe PhotoShop 2021/Presets/Scripts.  I don't know what it would be on a Mac.  To use the script in PhotoShop, select File | Scripts | Browse... and select the FrameWithUI.jsx file.  

It is possible that saving frame styles may require you to make the Scripts folder writable by all users of your computer.  The XML file that stores the styles gets written into that folder.  Because I made my folder writable early in the process of developing this script, I do not yet know if the script will run with that folder having its default security settings.

Detailed documentation can be found in the zip file (once I write it).
