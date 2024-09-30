"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BmiResult {
  bmi: string;
  category: string;
}

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      setResult(null);
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number.");
      setResult(null);
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number.");
      setResult(null);
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category });
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-blue-300">
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-lg border border-purple-600">
        <CardHeader>
          <CardTitle className="text-4xl text-purple-700 font-extrabold">BMI Calculator</CardTitle>
          <CardDescription className="text-gray-800">
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid gap-2">
            <Label htmlFor="height" className="text-gray-700">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
              className="border border-purple-400 focus:border-purple-600 focus:ring focus:ring-purple-200 rounded-md"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight" className="text-gray-700">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              className="border border-purple-400 focus:border-purple-600 focus:ring focus:ring-purple-200 rounded-md"
            />
          </div>
          <Button onClick={calculateBmi} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-200">
            Calculate
          </Button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          
          <div className="mt-4 p-4 border border-purple-400 rounded-md bg-white">
            {result && (
              <>
                <div className="text-center text-3xl font-bold text-purple-700">{result.bmi}</div>
                <div className="text-center text-lg font-medium text-gray-600">{result.category}</div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
