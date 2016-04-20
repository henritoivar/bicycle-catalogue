<?php

namespace App\Http\Controllers;

use App\Bicycle;
use App\BicyclePart;
use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class BicyclesController extends Controller
{
    public function index(){
        $bicycles = Bicycle::select(['*',
            DB::raw('(SELECT SUM(weight) FROM bicycle_parts WHERE bicycle_id = bicycles.id ) as weight'),
            DB::raw('(SELECT SUM(price) FROM bicycle_parts WHERE bicycle_id = bicycles.id ) as price')
        ])->get();

        return $bicycles;
    }

    public function show(Bicycle $bicycle)
    {
        $bicycle->load('bicycleParts');
        return $bicycle;
    }

    public function store(Request $request)
    {

        if ($bicycle = Bicycle::create($request->all())) {

            if ($request->has('bicycle_parts')) {
                $this->syncParts($request->get('bicycle_parts'), $bicycle);
            }

            return ['status' => 'success', 'message' => 'entry added successfully', 'id' => $bicycle->id];
        }

        return response()->json(['status' => 'error', 'message' => 'failed saving entry'], 500);
    }

    public function update(Request $request, Bicycle $bicycle)
    {
        if ($bicycle->update($request->all())) {

            if ($request->has('bicycle_parts')) {
                $this->syncParts($request->get('bicycle_parts'), $bicycle);
            }

            return ['status' => 'success', 'message' => 'entry updated successfully'];
        }

        return response()->json(['status' => 'error', 'message' => 'failed saving entry'], 500);
    }

    public function destroy(Bicycle $bicycle)
    {
        if ($bicycle->delete()) {
            return ['status' => 'success', 'message' => 'entry deleted successfully'];
        }

        return response()->json(['status' => 'error', 'message' => 'failed deleting entry'], 500);
    }

    private function syncParts($parts, $bicycle)
    {
        // Delete previous entries
        $bicycle->bicycleParts()->delete();

        $parts = collect($parts)->map(function ($part) {
            return new BicyclePart($part);
        });

        // Insert new entries
        $bicycle->bicycleParts()->saveMany($parts);
    }
}
