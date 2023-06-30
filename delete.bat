SET DIRECTORY_NAME=""C:\Users\Dummy\Documents\Github\BugTrackerProjectv1\BugTrackerApp\APP\node_modules""
TAKEOWN /f %DIRECTORY_NAME% /r /d y
ICACLS %DIRECTORY_NAME% /grant administrators:F /t
ICACLS %DIRECTORY_NAME% /reset /T
PAUSE