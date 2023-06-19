import { Category } from "../../models/category.model";
import { LearningPath } from "../../models/learning-path.model";
import { Skill } from "../../models/skill.model";

export const testSkills = [
    {
        "id": 1,
        "title": "Efficiency",
        "category": "Driving Skills",
        "imageName": "wave",
        "description": "Learn tricks and tips on how to drive for better energy efficiency, whether it's electric or combustion. Improve your fuel economy and reduce your environmental impact with this course."
      },
      {
        "id": 2,
        "title": "Mechanics",
        "category": "Vehicle knowledge",
        "imageName": "engine",
        "description": "Understand mechanical aspects of the car like Rev Matching, torque, gear ratios, and more. Get a deeper understanding of how your car works, which can help you take better care of it and resolve issues when they arise."
      },
      {
        "id": 3,
        "title": "Attention and Safety",
        "category": "Attention and Safety",
        "imageName": "headlight",
        "description": "Learn to pay attention and maintain safety, with fun exercises like a braking calculation system: Try to lift your foot off the accelerator at the exact moment to stop the car as close to the red light as possible without going over it."
      }
  ] as Skill[];
  
  export const testLearningPaths = [
    {
        "id": 1,
        "skills": [
          2
        ]
      }
  ] as LearningPath[];
  
  export const testCategories = [
    {
        "id": 1,
        "title": "Driving Skills"
      },
      {
        "id": 2,
        "title": "Vehicle knowledge"
      },
      {
        "id": 3,
        "title": "Attention and Safety"
      },
      {
        "id": 4,
        "title": "Electric Vehicles"
      }
  ] as Category[];