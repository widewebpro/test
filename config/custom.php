<?php
use craft\helpers\App;

// Used for loading css and js asset urls from manafest.json
$assetsManifest = @json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/_compiled/manifest.json')) ?: [];
$assetsManifestLegacy = @json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/_compiled/manifest-legacy.json')) ?: [];

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';


return [
  '*' => [
    'assetsManifest' => (array)$assetsManifest,
    'assetsManifestLegacy' => (array)$assetsManifestLegacy,

    'baseUrl' => App::env('PRIMARY_SITE_URL'),
    'basePath' => $_SERVER['DOCUMENT_ROOT'] . '/',
    'showGrid' => App::env('SHOW_GRID'),
]
];
