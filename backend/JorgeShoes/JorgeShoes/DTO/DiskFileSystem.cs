using HandlebarsDotNet;
using System.IO;

namespace JorgeShoes.DTO
{
    public class DiskFileSystem : ViewEngineFileSystem
    {
        public override bool FileExists(string filePath)
        {
            return File.Exists(filePath);
        }

        public override string GetFileContent(string filename)
        {
            return File.ReadAllText(filename);
        }

        protected override string CombinePath(string dir, string otherFileName)
        {
            return Path.Combine(dir, otherFileName);
        }
    }
}
