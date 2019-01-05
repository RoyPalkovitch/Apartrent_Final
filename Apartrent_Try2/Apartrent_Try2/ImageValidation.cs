using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apartrent_Try2
{
    public static class ImageValidation
    {

        public static List<byte[]> Base64Vadilation(string base64String, string[] base64StringArray)
        {
            try
            {
                List<byte[]> imageList = new List<byte[]>();
                if (base64StringArray != null)
                {
                    for (int i = 0; i < base64StringArray.Length; i++)
                    {
                        if (base64StringArray[i] == null)
                        {
                            imageList.Add(null);
                            continue;
                        }

                        imageList.Add(Convert.FromBase64String(base64StringArray[i]));
                    }
                    return imageList;
                }
                else if(base64String != null)
                    imageList.Add(Convert.FromBase64String(base64String));
                return imageList;

            }
            catch
            {
                return null;
            }
        }

        public static string[] BytesToBase64(byte[] image,List<byte[]> imageList)
        {
            string[] base64 = new string[5];
            try
            {
                if(imageList != null)
                {
                    
                    for (int i = 0; i < imageList.Count; i++)
                    {
                        if (imageList[i] == null)
                        {
                            base64[i] = null;
                            continue;
                        }
                        base64[i] = Convert.ToBase64String(imageList[i]);
                    }
                    return base64;
                }
                else if(image != null)
                    base64[0] = Convert.ToBase64String(image);
                return base64;
            }
            catch
            {
                return null;
            }
        }

    }
}
