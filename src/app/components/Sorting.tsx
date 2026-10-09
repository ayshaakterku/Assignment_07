'use client'
import React, { useState } from 'react';
import { IProductAll } from '../types';

type SortKey = 'Price Low to High' | 'Price High to Low' | 'Default';

const Sorting = () => {

    const [sortBy, setSortBy] = useState<SortKey>('Default);
    const sortData = (data: IProductAll[]) => {
        const sortedExercise = [...data];
        if (sortBy === "duration") {
            sortedExercise.sort((a, b) => b.duration - a.duration)
        } else if (sortBy === "rating") {
            sortedExercise.sort((a, b) => b.rating - a.rating)
        } else if (sortBy === "caloriesBurned") {
            sortedExercise.sort((a, b) => b.caloriesBurned - a.caloriesBurned)
        }
        return sortedExercise
    }

    const sortedTodayExercise = sortExercise(todayExercise);
    const sortedSavedExercise = sortExercise(savedExercise);
    return (
        <div>
            
        </div>
    );
};

export default Sorting;