<?php

/*
 * A replacement for elixir() that will work for both typical laravel development where the
 * blade file will include links and references to stylesheets and javascript, and it will
 * work for when you run laravel as the backend in a proxy setup with webpack-dev-server
 * as the controller.
 */

use Illuminate\Support\Str;

if (!function_exists('webpack')) {

    function webpack($path, $base = ""): string
    {
        static $manifest = [];

        $manifestPath = public_path($base . '/manifest.json');

        if (!isset($manifest[$manifestPath])) {
            if (!is_file($manifestPath)) {
                throw new Exception("Manifest not found at: {$manifestPath}");
            }

            $manifest[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifest[$manifestPath];

        if (!isset($manifest[$path])) {
            $exception = new Exception("Unable to locate Mix file: {$path}.");

            if (!app('config')->get('app.debug')) {
                report($exception);

                return $path;
            } else {
                throw $exception;
            }
        }

        $file_url = $manifest[$path];

        if (Str::startsWith($file_url, 'http')) {
            return $file_url;
        } else {
            return asset($file_url);
        }
    }
}
