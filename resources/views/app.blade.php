
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#171717">

    <title inertia>Calculator Hub</title>

    <meta
        name="description"
        content="Calculator Hub offers useful online calculators for everyday calculations, age, health, and more."
    >

    <meta name="robots" content="index, follow">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Calculator Hub">
    <meta property="og:title" content="Calculator Hub - Free Online Calculators">
    <meta
        property="og:description"
        content="Use Calculator Hub for quick and convenient online calculations."
    >
    <meta property="og:url" content="{{ url('/') }}">
    
    <meta property="og:image" content="{{ asset('og-image.png') }}">
<meta name="twitter:image" content="{{ asset('og-image.png') }}">

    <!-- Twitter / X preview -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Calculator Hub - Free Online Calculators">
    <meta
        name="twitter:description"
        content="Use Calculator Hub for quick and convenient online calculations."
    >

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
