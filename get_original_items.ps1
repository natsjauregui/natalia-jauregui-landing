$logPath = "C:\Users\natsj\.gemini\antigravity-ide\brain\6d28af8e-865d-46f4-8fb9-ef3bf2225bc5\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $logPath
foreach ($line in $lines) {
    if ($line -match '"type":"CODE_ACTION"' -and $line -match 'index.html') {
        $json = ConvertFrom-Json $line
        Write-Output "Step $($json.step_index) on $($json.created_at)"
    }
}
