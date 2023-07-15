<?php

namespace App\Actions\Location;

class GetOriginalClientIp
{
    public function __invoke(): string
    {
        if ($override = config('settings.location.force_ip')) {
            return $override;
        }

        $xForwardedFor = request()->header('x-forwarded-for');

        if (empty($xForwardedFor)) {
            // Use the default IP address
            $ip = request()->ip();
        } else {
            // Use the first IP address in the X-Forwarded-For header
            $ips = is_array($xForwardedFor) ? $xForwardedFor : explode(', ', $xForwardedFor);
            $ip = $ips[0];
        }

        return $ip;
    }
}
