<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use Illuminate\Http\Request;


class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return SurveyResource
     */
    public function store(StoreSurveyRequest $request)
    {
        $result = Survey::create($request->validated());
        return new SurveyResource($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     *
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, "Unauthorised action;");
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $survey->update($request->validated());
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return
     */
    public function destroy( Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, "Unauthorised action;");
        }

        $survey->delete();
        return response('', 204);
    }
}
