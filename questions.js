const QUESTION_BANK = [
    {
        id: 1,
        subject: 'Mixed',
        text: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Madrid', 'Rome'],
        answer: 1,
        meta: 'Test',
        explanation: 'Paris is the capital of France.'
    },
    {
        id: 2,
        subject: 'Anatomy',
        text: 'Which of the following is the largest organ in the human body?',
        options: ['Liver', 'Heart', 'Brain', 'Skin', 'Lung'],
        answer: 3,
        meta: 'Test',
        explanation: 'The skin is the largest organ in the human body.'
    }
];

console.log('✅ TEST questions.js loaded. Total questions:', QUESTION_BANK.length);
