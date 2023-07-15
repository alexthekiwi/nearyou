<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\PostCode;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * Handy tool:
         * https://www.freemaptools.com/find-new-zealand-postcodes-inside-user-defined-area.htm
         */
        $postCodeRanges = $this->getPostCodeRanges();

        $locations = $postCodeRanges
            ->pluck('location')
            ->map(fn ($location) => Location::query()->firstOrCreate(['name' => $location]));

        $postCodeRanges->each(function ($range) use ($locations) {
            PostCode::query()
                ->whereIn('code', $range['postcodes'])
                ->update(['location_id' => $locations->firstWhere('name', $range['location'])->id]);
        });
    }

    public function getPostCodeRanges()
    {
        return collect([
            ['location' => 'East Auckland', 'postcodes' => [2010, 2012, 2013, 2014, 2018, 2140, 2141, 2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2571]],
            ['location' => 'South Auckland', 'postcodes' => [2022, 2023, 2024, 2025, 2102, 2103, 2104, 2105, 2110, 2112, 2113, 2150, 2151, 2153, 2154, 2155, 2156, 2157, 2158, 2159, 2160, 2240, 2241, 2242, 2243, 2244, 2245, 2246]],
            ['location' => 'North Shore', 'postcodes' => ['0620', '0622', '0624', '0626', '0627', '0629', '0630', '0632', '0740', '0741', '0743', '0744', '0745', '0746', '0747', '0748', '0749', '0750', '0751', '0752', '0753', '0754', '0755', '0756', '0757', '0758']],
            ['location' => 'Central Auckland', 'postcodes' => ['0644', 1011, 1021, 1022, 1023, 1024, 1025, 1041, 1042, 1052, 1140, 1141, 1142, 1143, 1144, 1145, 1147, 1148, 1149, 1150, 1151, 1245, 1246, 1340, 1342, 1344, 1345, 1346, 1347, 1349, 1351, 1352, 1440, 1443, 1445, 1446, 1541, 1543]],
            ['location' => 'West Auckland', 'postcodes' => ['0602', '0610', '0612', '0614', '0640', '0641', '0642', '0643', '0645', '0650', '0651', '0652', '0653', '0654', '0655', '0656', '0657', '0663', 1026, 1348]],
        ]);
    }
}
