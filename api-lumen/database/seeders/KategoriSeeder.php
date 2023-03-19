<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {

            $data = [
                'kategori' => $faker->city,
                'keterangan' => $faker->text
            ];

            Kategori::create($data);
        }
    }
}
