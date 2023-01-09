<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

// Used for loading css and js asset urls from manafest.json
$assetsManifest = @json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/_compiled/manifest.json')) ?: [];
$assetsManifestLegacy = @json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/_compiled/manifest-legacy.json')) ?: [];

use craft\helpers\App;

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';

return [
  '*' => [



    'allowUpdates' => $isDev,
    'devMode' => $isDev,
    'allowAdminChanges' => $isDev,
    'disallowRobots' => !$isProd,

    'defaultWeekStartDay' => 1,
    'omitScriptNameInUrls' => true,
    'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',
    'securityKey' => App::env('SECURITY_KEY'),
  ],

  'dev' => [],
  'staging' => [],
  'production' => [],
];
