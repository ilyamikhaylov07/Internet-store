using Internet_Store.ApiJsonResponse;
using Internet_Store.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Internet_Store.ModelFactories
{
    public class SizeSort
    {
        public static void SortSizes(List<string> sizes)
        {
            // Словарь, определяющий порядок стандартных размеров
            Dictionary<string, int> sizeOrder = new Dictionary<string, int>
        {
            { "XS", 0 },
            { "S", 1 },
            { "M", 2 },
            { "L", 3 },
            { "XL", 4 },
            { "XXL", 5 },
            { "XXXL", 6 }
        };

            // Кастомная функция сравнения для сортировки списка
            sizes.Sort((a, b) =>
            {
                // Попробуйте получить порядковый номер из sizeOrder
                int orderA, orderB;
                bool isNumericA = int.TryParse(a, out int sizeA);
                bool isNumericB = int.TryParse(b, out int sizeB);

                // Сравнение числовых размеров
                if (isNumericA && isNumericB)
                {
                    return sizeA.CompareTo(sizeB);
                }
                // Сравнение символьных размеров
                else if (sizeOrder.TryGetValue(a, out orderA) && sizeOrder.TryGetValue(b, out orderB))
                {
                    return orderA.CompareTo(orderB);
                }
                // Если один размер символьный, а другой числовой, размещаем символьные размеры раньше
                else if (isNumericA)
                {
                    return 1;
                }
                else if (isNumericB)
                {
                    return -1;
                }
                // В ином случае сравниваем по строкам
                else
                {
                    return a.CompareTo(b);
                }
            });



        }
    }
}

