class cell
{
  constructor(XIndex, YIndex)
  {
    this.XIndex = XIndex;
    this.YIndex = YIndex;
    this.Object = false;
    this.Number = 0;
    this.State = 0; // 0 = nothing, 1 = flag, 2 = maybe
    this.Visible = false;
  }
  
  SetObject()
  {
    this.Object = true;
  }
  
  SetVisible()
  {
    this.Visible = true;
    if (this.Number == 0)
      {
        // Do the neighbors as well
        // increase all neighbor cells counts:
        for (let XOff = -1; XOff <= 1; ++XOff)
        {
          if (this.XIndex + XOff >= 0 && this.XIndex + XOff < cols)
            {
              for (let YOff = -1; YOff <= 1; ++YOff)
              {
                if (this.YIndex + YOff >= 0 && this.YIndex + YOff < rows)
                {
                  if (!cells[this.XIndex + XOff][this.YIndex + YOff].Visible)
                    {
                        cells[this.XIndex + XOff][this.YIndex + YOff].SetVisible();                      
                    }
                }
              }
            }
          
        }
      }
  }
  
  IncreaseCount()
  {
    this.Number++;
  }
  
  GetXLocation()
  {
    return this.XIndex * CellSize;
  }
  
  GetYLocation()
  {
     return this.YIndex * CellSize;
  }
  
  NextState()
  {
    this.State = (this.State + 1) % 3; 
  }
  
  Show()
  {
    stroke(0);
    if (!this.Visible)
    {
      if (this.State == 0)
        {
          fill(120);      
        }
      else if (this.State == 1)
        {
          fill(120,0,0);      
        }
      else if (this.State == 2)
        {
          fill(120,120,0);      
        }
      else
        {
          fill(0); // should never occur
        }
      rect(this.GetXLocation(), this.GetYLocation(), CellSize, CellSize);
      return;
    }
    fill(175);
    rect(this.GetXLocation(), this.GetYLocation(), CellSize, CellSize);
      
    if(this.Object)
    {
      const xloc = this.GetXLocation();
      const yloc = this.GetYLocation();
      fill (60);
      triangle(xloc + CellSize * 0.1, yloc + CellSize * 0.9, xloc + CellSize * 0.9, yloc + CellSize * 0.9, xloc  + CellSize * 0.5, yloc + CellSize * 0.1);
      return;
    }
    if (this.Number > 0)
    {
      fill(0);
      text(this.Number, this.GetXLocation() + 0.4 * CellSize, this.GetYLocation() + 0.65 * CellSize);
    } 
  }
}