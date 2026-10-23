<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CalculationHistory extends Model
{
    protected $fillable = [
        'calculator_type',
        'inputs',
        'result',
    ];

    protected function casts(): array
    {
        return [
            'inputs' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
