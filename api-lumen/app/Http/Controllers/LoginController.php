<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    public function index()
    {
        $data = User::where('level', '<>', 'pelanggan')->get();
        return response()->json($data);
    }

    public function register(Request $request)
    {
        $data = [
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'level' => $request->input('level'),
            'api_token' => '123456',
            'status' => '1',
            'relasi' => $request->input('relasi'),
        ];

        User::create($data);

        return response()->json($data);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (isset($user)) {
            if ($user->status === 1) {
                if (Hash::check($password, $user->password)) {
                    $token = Str::random(40);

                    $user->update([
                        'api_token' => $token
                    ]);

                    return response()->json([
                        'pesan' => 'Login berhasil',
                        'token' => $token,
                        'data' => $user
                    ]);
                } else {
                    return response()->json([
                        'pesan' => 'Login gagal',
                        'data' => ""
                    ]);
                }
            } else {
                return response()->json([
                    'pesan' => 'Login gagal',
                    'data' => ""
                ]);
            }
        } else {
            return response()->json([
                'pesan' => 'Login gagal',
                'data' => ""
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        //
        $user = User::where('id', $id)->update($request->all());

        if ($user) {
            return response()->json([
                'pesan' => "Data Has Been Updated"
            ]);
        }
    }
}
