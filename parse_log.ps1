$logPath = "C:\Users\natsj\.gemini\antigravity-ide\brain\6d28af8e-865d-46f4-8fb9-ef3bf2225bc5\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $logPath
foreach ($line in $lines) {
    if ($line -match '"step_index":7,') {
        $json = ConvertFrom-Json $line
        $content = $json.content
        # Let's find any occurrences of sindolor in the content
        $contentLines = $content -split "`n"
        foreach ($cLine in $contentLines) {
            if ($cLine -match "sindolor") {
                Write-Output $cLine
            }
        }
        break
    }
}
