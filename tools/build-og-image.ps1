<#
  Builds assets/og-image.jpg, the link preview card for mohamedelhayyany.com.

  Why a dedicated card and not the portrait: a raw 928x1152 photo is cropped
  differently by every app that renders a link preview, so the head was being
  cut. This draws a 1200x630 card in the site's own palette and type.

  THE CENTRE SQUARE IS THE REAL CANVAS. Instagram and several other apps crop
  a link preview to a square, so everything that has to survive is drawn inside
  the middle 630x630 (x 285 to 915). Outside that is background only. Nothing
  lands within 60px of any edge either.

  Run it from the repository root:
      powershell -ExecutionPolicy Bypass -File tools\build-og-image.ps1

  Inter is not usually installed on Windows, so the three weights are kept in
  tools/fonts/. If they are missing the script fetches them from Google Fonts
  once. They are build-time only and are not served to visitors; the site still
  loads Inter from Google Fonts itself.
#>

[CmdletBinding()]
param(
    # Where to write the card. Relative paths resolve against the repository root.
    [string] $OutFile = 'assets\og-image.jpg',

    # Optional folder for the two proof renders: the full card and the centre
    # square an app would crop to. Nothing is written unless this is given.
    [string] $PreviewDir,

    # Hard ceiling. The quality search steps down until the file fits.
    [int] $MaxBytes = 300000
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore, PresentationFramework, WindowsBase

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# ---------------------------------------------------------------- the palette
# These are the live values from style.css. If the palette moves, move them.
function Hex([string] $h) { [System.Windows.Media.ColorConverter]::ConvertFromString($h) }

$BG       = Hex '#d6d0c1'   # --bg,       warm beige page background
$SURFACE  = Hex '#e3dfd3'   # --surface,  the disc behind the portrait
$TEXT     = Hex '#111111'   # --text,     the name
$BODY     = Hex '#4a463d'   # --body,     the role title
$MUTED    = Hex '#5c574c'   # --muted,    the domain
$YELLOW   = Hex '#f5e500'   # --accent-2, a surface only, never a foreground
$BORDER   = [System.Windows.Media.Color]::FromArgb(20, 0, 0, 0)   # --border, 0.08 alpha

# ------------------------------------------------------------------ the frame
$CARD_W = 1200; $CARD_H = 630
$SQ = 630                       # the square an app may crop to
$SQ_L = ($CARD_W - $SQ) / 2          # 285
$SQ_R = $SQ_L + $SQ             # 915
$EDGE = 60                      # nothing important inside this margin

# --------------------------------------------------------------------- layout
# A stacked, centred column rather than a portrait-left / text-right split.
# The brief suggested the split, and it was built and measured first: inside a
# 630 square there is only 630px to share, so the text column came out at 276px
# and either the role title set at 17px or the disc and the name had to shrink
# to the point of being decorative. Worse, the content then ran edge to edge in
# the square crop, which is the one crop the 60px margin exists to survive.
# Stacking gives the full 510px measure to every line and keeps the margin on
# all four sides of the square as well as of the card.
$SAFE_L = $SQ_L + $EDGE         # 345
$SAFE_R = $SQ_R - $EDGE         # 855
$SAFE_W = $SAFE_R - $SAFE_L     # 510
$SAFE_H = $CARD_H - (2 * $EDGE)      # 510
$MID_X  = $CARD_W / 2
$MID_Y  = $CARD_H / 2
$DISC   = 200                   # portrait disc diameter
$TEXT_W = $SAFE_W

# ---------------------------------------------------------------------- fonts
$fontDir = Join-Path $PSScriptRoot 'fonts'
# The keys are STRINGS on purpose. An [ordered] dictionary reads an integer in
# square brackets as a position rather than as a key, so $weights[400] is an
# out-of-range index and comes back null, and every lookup below silently
# resolves to nothing. That failure is invisible: the font check then finds
# nothing missing and WPF quietly substitutes the nearest weight it does have.
$weights = [ordered]@{
    '400' = 'Inter-Regular.ttf'
    '500' = 'Inter-Medium.ttf'
    '700' = 'Inter-Bold.ttf'
    '800' = 'Inter-ExtraBold.ttf'
}

function Get-InterFonts {
    if (-not (Test-Path $fontDir)) { New-Item -ItemType Directory -Force -Path $fontDir | Out-Null }

    $missing = @($weights.Keys | Where-Object { -not (Test-Path (Join-Path $fontDir $weights[$_])) })
    if ($missing.Count -eq 0) { return $true }

    Write-Host "Fetching $($missing.Count) Inter weight(s) from Google Fonts into tools\fonts ..."
    # An old Android user agent is what makes the API hand back plain TTF.
    # A modern one returns woff2 and MSIE returns eot, neither of which WPF reads.
    $ua = @{ 'User-Agent' = 'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30' }
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    # Downloaded into memory and written in one go: a slow network call between
    # creating the folder and writing into it has been seen to lose the folder
    # on a OneDrive-backed checkout.
    $blobs = @{}
    foreach ($w in $missing) {
        try {
            $css = (Invoke-WebRequest -UseBasicParsing -Uri "https://fonts.googleapis.com/css?family=Inter:$w" -Headers $ua).Content
            $url = [regex]::Match($css, 'url\((.+?)\)').Groups[1].Value
            if (-not $url) { throw 'no font url in the stylesheet' }
            $blobs[$w] = (Invoke-WebRequest -UseBasicParsing -Uri $url).Content
        } catch {
            Write-Warning "Could not fetch Inter $w : $($_.Exception.Message)"
            return $false
        }
    }
    foreach ($w in $blobs.Keys) {
        $bytes = $blobs[$w]
        if ($bytes[0] -ne 0 -or $bytes[1] -ne 1) { Write-Warning "Inter $w did not come back as a TTF."; return $false }
        [IO.File]::WriteAllBytes((Join-Path $fontDir $weights[$w]), $bytes)
    }
    return $true
}

$haveInter = Get-InterFonts
if ($haveInter) {
    $family = New-Object System.Windows.Media.FontFamily((New-Object System.Uri($fontDir + '\')), './#Inter')
} else {
    Write-Warning 'Falling back to Segoe UI. The card will not match the site''s type.'
    $family = New-Object System.Windows.Media.FontFamily('Segoe UI')
}

function Face([int] $weight) {
    New-Object System.Windows.Media.Typeface(
        $family,
        [System.Windows.FontStyles]::Normal,
        [System.Windows.FontWeight]::FromOpenTypeWeight($weight),
        [System.Windows.FontStretches]::Normal)
}
$FACE_NAME  = Face 800
$FACE_TITLE = Face 500
$FACE_URL   = Face 400

# TryGetGlyphTypeface returns true for a SUBSTITUTED weight, so the weight that
# comes back has to be compared with the one asked for. Without that a missing
# file just renders a lighter card and says nothing.
foreach ($f in @(@($FACE_NAME, 800), @($FACE_TITLE, 500), @($FACE_URL, 400))) {
    $gt = $null
    if (-not $f[0].TryGetGlyphTypeface([ref] $gt)) {
        Write-Warning "Weight $($f[1]) did not resolve at all; it will be synthesised."
    } elseif ($haveInter -and $gt.Weight.ToOpenTypeWeight() -ne $f[1]) {
        Write-Warning "Weight $($f[1]) fell back to $($gt.Weight.ToOpenTypeWeight()) ($(Split-Path $gt.FontUri.LocalPath -Leaf))."
    }
}

# ------------------------------------------------------------- text machinery
$CULTURE = [System.Globalization.CultureInfo]::GetCultureInfo('en-US')

function New-Text([string] $s, $face, [double] $size, $colour) {
    New-Object System.Windows.Media.FormattedText(
        $s, $CULTURE,
        [System.Windows.FlowDirection]::LeftToRight,
        $face, $size,
        (New-Object System.Windows.Media.SolidColorBrush($colour)),
        $null, 1.0)
}

# FormattedText has no letter-spacing, and the wordmark carries -0.03em on the
# site, so the name is set one glyph at a time with the tracking added by hand.
function Measure-Tracked([string] $s, $face, [double] $size, [double] $trackEm) {
    $track = $size * $trackEm
    $total = 0.0
    foreach ($ch in $s.ToCharArray()) {
        $total += (New-Text ([string] $ch) $face $size $TEXT).WidthIncludingTrailingWhitespace + $track
    }
    if ($s.Length -gt 0) { $total -= $track }
    return $total
}

function Draw-Tracked($dc, [string] $s, $face, [double] $size, [double] $trackEm, [double] $x, [double] $yTop, $colour) {
    $track = $size * $trackEm
    foreach ($ch in $s.ToCharArray()) {
        $ft = New-Text ([string] $ch) $face $size $colour
        $dc.DrawText($ft, (New-Object System.Windows.Point($x, $yTop)))
        $x += $ft.WidthIncludingTrailingWhitespace + $track
    }
}

function Wrap-Text([string] $s, $face, [double] $size, [double] $maxW) {
    $words = $s -split ' '
    $lines = @(); $cur = ''
    foreach ($word in $words) {
        $try = if ($cur) { "$cur $word" } else { $word }
        if ((New-Text $try $face $size $TEXT).Width -le $maxW -or -not $cur) {
            $cur = $try
        } else {
            $lines += $cur; $cur = $word
        }
    }
    if ($cur) { $lines += $cur }
    return $lines
}

# ----------------------------------------------------------------- the copy
# The role title at its full length, with the ampersand, which is the form the
# site uses wherever there is room. The <head> spells out "and" instead; that
# exception is for the meta tags, not for this card.
$NAME_1 = 'MOHAMED'
$NAME_2 = 'ELHAYYANY'
$TITLE  = 'Technical Customer Success Manager & Business Developer'
$DOMAIN = 'mohamedelhayyany.com'

# The break is set by hand rather than left to the wrapper. Greedy wrapping fits
# the ampersand onto the first line and leaves it dangling at the end of it,
# which reads as a line that has lost its second half.
$TITLE_BREAK = @('Technical Customer Success Manager', '& Business Developer')

# ----------------------------------------------------- size the name to fit
$TRACK = -0.03
$TITLE_SIZE = 22.0
$URL_SIZE   = 15.0
$RULE_W = 56.0; $RULE_H = 5.0
$GAP_DISC_NAME = 30.0; $GAP_NAME_RULE = 22.0; $GAP_RULE_TITLE = 20.0; $GAP_TITLE_URL = 16.0

$titleLines = $TITLE_BREAK
$widestTitle = ($titleLines | ForEach-Object { (New-Text $_ $FACE_TITLE $TITLE_SIZE $TEXT).Width } | Measure-Object -Maximum).Maximum
if ($widestTitle -gt $TEXT_W) {
    # the hand-set break no longer fits the measure, so fall back to wrapping
    $titleLines = Wrap-Text $TITLE $FACE_TITLE $TITLE_SIZE $TEXT_W
}
$titleLead  = $TITLE_SIZE * 1.4

# Widest line first, then step the whole column down until it clears 60px top
# and bottom as well. The name is the only elastic part.
$nameSize = 66.0
while ($nameSize -gt 24) {
    $widest = [Math]::Max(
        (Measure-Tracked $NAME_1 $FACE_NAME $nameSize $TRACK),
        (Measure-Tracked $NAME_2 $FACE_NAME $nameSize $TRACK))
    $nameLead = $nameSize * 0.98
    $stackH = $DISC + $GAP_DISC_NAME + ($nameLead * 2) + $GAP_NAME_RULE + $RULE_H +
              $GAP_RULE_TITLE + ($titleLead * $titleLines.Count) + $GAP_TITLE_URL + ($URL_SIZE * 1.3)
    if ($widest -le $TEXT_W -and $stackH -le $SAFE_H) { break }
    $nameSize -= 0.5
}
$nameLead = $nameSize * 0.98
$blockH = $DISC + $GAP_DISC_NAME + ($nameLead * 2) + $GAP_NAME_RULE + $RULE_H +
          $GAP_RULE_TITLE + ($titleLead * $titleLines.Count) + $GAP_TITLE_URL + ($URL_SIZE * 1.3)
$blockTop = $MID_Y - ($blockH / 2)
$discTop = $blockTop

# ------------------------------------------------------------- the portrait
# The source is the hero cutout. Measured on the current 1000x1250 asset:
# hair starts at y=41, the head is widest around y=250 to 300, the chin is near
# y=580, and the shoulders are full width by y=820. The square below puts the
# hair at about 14% down the disc and runs the shoulders off the bottom of it,
# which is the ordinary framing for a head and shoulders portrait. It also stops
# well above y=1249, where the asset is a hard crop.
$portraitPath = Join-Path $root 'assets\images\portrait-cutout.png'
if (-not (Test-Path $portraitPath)) { throw "Missing $portraitPath" }
$portrait = New-Object System.Windows.Media.Imaging.BitmapImage((New-Object System.Uri($portraitPath)))

$CROP = 950.0
$CROP_CX = 535.0      # the face is centred here, not on the image's own centre
$CROP_TOP = -92.0     # above the image, so there is headroom over the hair
$cropLeft = $CROP_CX - ($CROP / 2)

$scale = $DISC / $CROP
$DISC_L = $MID_X - ($DISC / 2)
$imgW = $portrait.PixelWidth * $scale
$imgH = $portrait.PixelHeight * $scale
$imgX = $DISC_L - ($cropLeft * $scale)
$imgY = $discTop - ($CROP_TOP * $scale)

# ------------------------------------------------------------------ draw it
$visual = New-Object System.Windows.Media.DrawingVisual
$dc = $visual.RenderOpen()

$dc.DrawRectangle(
    (New-Object System.Windows.Media.SolidColorBrush($BG)), $null,
    (New-Object System.Windows.Rect(0, 0, $CARD_W, $CARD_H)))

# One soft bloom, low opacity, centred on the content. The brief allows one per
# screen; it stops the wide bands outside the square reading as dead space
# without putting anything there that a square crop would cut in half.
$bloom = New-Object System.Windows.Media.RadialGradientBrush
$bloom.GradientOrigin = New-Object System.Windows.Point(0.5, 0.5)
$bloom.Center = New-Object System.Windows.Point(0.5, 0.5)
$bloom.RadiusX = 0.42; $bloom.RadiusY = 0.80
$bloom.GradientStops.Add((New-Object System.Windows.Media.GradientStop(([System.Windows.Media.Color]::FromArgb(36, 255, 255, 255)), 0.0)))
$bloom.GradientStops.Add((New-Object System.Windows.Media.GradientStop(([System.Windows.Media.Color]::FromArgb(14, 255, 255, 255)), 0.55)))
$bloom.GradientStops.Add((New-Object System.Windows.Media.GradientStop(([System.Windows.Media.Color]::FromArgb(0, 255, 255, 255)), 1.0)))
$dc.DrawRectangle($bloom, $null, (New-Object System.Windows.Rect(0, 0, $CARD_W, $CARD_H)))

# the disc, then the portrait clipped into it
$discCentre = New-Object System.Windows.Point($MID_X, ($discTop + $DISC / 2))
$dc.DrawEllipse(
    (New-Object System.Windows.Media.SolidColorBrush($SURFACE)), $null,
    $discCentre, ($DISC / 2), ($DISC / 2))

$clip = New-Object System.Windows.Media.EllipseGeometry($discCentre, ($DISC / 2), ($DISC / 2))
$dc.PushClip($clip)
$dc.DrawImage($portrait, (New-Object System.Windows.Rect($imgX, $imgY, $imgW, $imgH)))
$dc.Pop()

$dc.DrawEllipse(
    $null,
    (New-Object System.Windows.Media.Pen((New-Object System.Windows.Media.SolidColorBrush($BORDER)), 1.5)),
    $discCentre, ($DISC / 2), ($DISC / 2))

# the name
$y = $discTop + $DISC + $GAP_DISC_NAME
foreach ($line in @($NAME_1, $NAME_2)) {
    $lineW = Measure-Tracked $line $FACE_NAME $nameSize $TRACK
    Draw-Tracked $dc $line $FACE_NAME $nameSize $TRACK ($MID_X - $lineW / 2) $y $TEXT
    $y += $nameLead
}
$y += $GAP_NAME_RULE

# the yellow rule. Yellow is 1.18:1 on this beige, so it is only ever a shape.
$dc.DrawRoundedRectangle(
    (New-Object System.Windows.Media.SolidColorBrush($YELLOW)), $null,
    (New-Object System.Windows.Rect(($MID_X - $RULE_W / 2), $y, $RULE_W, $RULE_H)),
    ($RULE_H / 2), ($RULE_H / 2))
$y += $RULE_H + $GAP_RULE_TITLE

foreach ($line in $titleLines) {
    $ft = New-Text $line $FACE_TITLE $TITLE_SIZE $BODY
    $dc.DrawText($ft, (New-Object System.Windows.Point(($MID_X - $ft.Width / 2), $y)))
    $y += $titleLead
}
$y += $GAP_TITLE_URL

$ft = New-Text $DOMAIN $FACE_URL $URL_SIZE $MUTED
$dc.DrawText($ft, (New-Object System.Windows.Point(($MID_X - $ft.Width / 2), $y)))

$dc.Close()

$rtb = New-Object System.Windows.Media.Imaging.RenderTargetBitmap(
    $CARD_W, $CARD_H, 96, 96, [System.Windows.Media.PixelFormats]::Pbgra32)
$rtb.Render($visual)

# -------------------------------------------------------------- encode it
function Save-Jpeg($source, [string] $path, [int] $maxBytes) {
    $quality = 90
    while ($true) {
        $enc = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
        $enc.QualityLevel = $quality
        $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($source))
        $ms = New-Object IO.MemoryStream
        $enc.Save($ms)
        $bytes = $ms.ToArray()
        $ms.Dispose()
        if ($bytes.Length -le $maxBytes -or $quality -le 60) {
            $dir = Split-Path -Parent $path
            if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
            [IO.File]::WriteAllBytes($path, $bytes)
            return [pscustomobject]@{ Quality = $quality; Bytes = $bytes.Length }
        }
        $quality -= 3
    }
}

$outPath = if ([IO.Path]::IsPathRooted($OutFile)) { $OutFile } else { Join-Path $root $OutFile }
$result = Save-Jpeg $rtb $outPath $MaxBytes

"card      : $outPath"
"size      : ${CARD_W}x${CARD_H}"
"jpeg      : quality $($result.Quality), $([math]::Round($result.Bytes/1KB,1)) KB (ceiling $([math]::Round($MaxBytes/1KB)) KB)"
"name      : Inter 800 at $nameSize px, tracking ${TRACK}em"
"title     : $($titleLines.Count) line(s) at $TITLE_SIZE px"
"safe sq   : x $SQ_L..$SQ_R, inset to $SAFE_L..$SAFE_R"
"content   : y $([math]::Round($blockTop))..$([math]::Round($blockTop + $blockH)), $([math]::Round($blockH))px tall in $SAFE_H of room"
"edge clear: $([math]::Round($blockTop))px top and bottom, floor is $EDGE"

# ------------------------------------------------- the two proof renders
if ($PreviewDir) {
    if (-not (Test-Path $PreviewDir)) { New-Item -ItemType Directory -Force -Path $PreviewDir | Out-Null }

    $full = Join-Path $PreviewDir 'og-card-full.jpg'
    [IO.File]::WriteAllBytes($full, [IO.File]::ReadAllBytes($outPath))

    $crop = New-Object System.Windows.Media.Imaging.CroppedBitmap(
        $rtb, (New-Object System.Windows.Int32Rect([int] $SQ_L, 0, $SQ, $SQ)))
    $sq = Join-Path $PreviewDir 'og-card-square.jpg'
    Save-Jpeg $crop $sq 400000 | Out-Null

    "preview   : $full"
    "preview   : $sq"
}
