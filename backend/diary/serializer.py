def diary_serializer(diary):
    people = diary.people.all()
    people_id = [person.id for person in people]
    diary_dict = {
        'author' : diary.author.id,
        'content' : diary.content,
        'categoryName' : diary.category.name,
        'categoryTitle': diary.category.category_title,
        'people' : people_id,
        'rating' : diary.category.rating,
        'emotionScore': diary.emotion_score,
        'created_date' : diary.created_date,
        'modified_date' : diary.modified_date,
    }
    return diary_dict