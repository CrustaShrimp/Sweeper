let SizeRadio;

const CellSize = 25;

let cells = [];
let Mode = -1;

let cols = 8;
let rows = 8;

let ObjectsInitialised = false;

function ResetField(SizeX, SizeY)
{
  cols = SizeX;
  rows = SizeY;
  for (let i = 0; i < SizeX; i++) 
  {
    cells[i] = [];
    for (let j = 0; j < SizeY; j++) 
      {
        cells[i][j] = new cell(i,j);
      }
  }
  ObjectsInitialised = false;
}

function GetXIndexFrom1D(Index1D)
{
  return floor(Index1D / rows);
}


function GetYIndexFrom1D(Index1D)
{
  return floor(Index1D % cols);
}

function InitialiseObjects(IndexX, IndexY)
{
  const TotalOptions = cols * rows;
  var IndexOptions = [];

  for (let Index1D = 0; Index1D < TotalOptions; Index1D++) 
  {
   IndexOptions.push(Index1D);
  }
  IndexOptions.splice(IndexX * cols + IndexY, 1);
  const NrObjects = 5; // TODO should be something smart
  for (let iObject = 0; iObject < NrObjects; ++iObject)
    {
      const ObjectIndex1D = round(random(IndexOptions.length));
      const NewXIndex = GetXIndexFrom1D(IndexOptions[ObjectIndex1D]);
      const NewYIndex = GetYIndexFrom1D(IndexOptions[ObjectIndex1D]);
      cells[NewXIndex][NewYIndex].SetObject();
      IndexOptions.splice(ObjectIndex1D, 1);      
      
      // increase all neighbor cells counts:
      for (let XOff = -1; XOff <= 1; ++XOff)
        {
          if (NewXIndex + XOff >= 0 && NewXIndex + XOff < cols)
            {
              for (let YOff = -1; YOff <= 1; ++YOff)
              {
                if (NewYIndex + YOff >= 0 && NewYIndex + YOff < rows)
                {
                  cells[NewXIndex + XOff][NewYIndex + YOff].IncreaseCount();
                }
              }
            }
          
        }
    }
  ObjectsInitialised = true;
}

function setup() 
{
  createCanvas(800, 500);
  SizeRadio = createRadio();
  SizeRadio.position(0, 475);
  SizeRadio.size(500);

  // Add a few color options.
  // Color values are labeled with
  // emotions they evoke.
  SizeRadio.option(8  , 'Classic 8x8');
  SizeRadio.option(9  , 'Easy 9x9');
  SizeRadio.option(16, 'Medium 16x16');
  SizeRadio.option(30, 'Expert 30x16');

  // Choose a default option.
  SizeRadio.selected('9');
}

function mousePressed()
{
  // Get index:
  const XIndex = floor(mouseX / CellSize);
  const YIndex = floor(mouseY / CellSize);
  
  if (XIndex < 0 || XIndex >= cols)
    {
      return;
    }
  if (YIndex < 0 || YIndex >= rows)
    {
      return;
    }
  
  if (mouseButton === CENTER)
  {
    cells[XIndex][YIndex].NextState();
  }
  else if (mouseButton === LEFT)
  {
    if (!ObjectsInitialised)
    {
      InitialiseObjects(XIndex, YIndex);
    }
    if (cells[XIndex][YIndex].Object)
      {
        // Game over
        for (let ColumnToShow of cells)
          {
            for (let CellToShow of ColumnToShow)
              {
                CellToShow.Visible = true;
              }
          }
        return;
      }
    cells[XIndex][YIndex].SetVisible();
  }
}

function draw() 
{
  background(220);
  
  if (Mode != SizeRadio.value())
    {
      Mode = SizeRadio.value();
      const ModeY = Mode == 30 ? 16 : Mode;
      ResetField(Mode,ModeY);
    }
  for (i = 0; i < cols; ++i)
    {
      for (j = 0; j < rows; ++j)
      {  
        cells[i][j].Show();
      }
    }
  
}