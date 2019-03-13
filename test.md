## Test image
<div style="text-align:center">
<a href="http://stackoverflow.com">
  <img src="https://storage.googleapis.com/graphql-engine-cdn.hasura.io/assets/graphql2chartjs/g2c-youtube-embed.png" width="500px">
</a>
</div>

## Bar

|Property|Type|Description|
|--- |--- |--- |
|xAxisID|String|The ID of the x axis to plot this dataset on. If not specified, this defaults to the ID of the first found x axis|
|yAxisID|String|The ID of the y axis to plot this dataset on. If not specified, this defaults to the ID of the first found y axis.|
|backgroundColor|Color (String) |The fill color of the bar|
|borderColor|Color (String)|The color of the bar border|
|borderWidth|Number|The stroke width of the bar in pixels.|
|hoverBackgroundColor|Color (String)|The fill colour of the bars when hovered.|
|hoverBorderColor|Color (String)|The stroke colour of the bars when hovered.|
|hoverBorderWidth|Number|The stroke width of the bars when hovered.|

## Line

|Property|Type|Description|
|--- |--- |--- |
|xAxisID|String|The ID of the x axis to plot this dataset on. If not specified, this defaults to the ID of the first found x axis|
|yAxisID|String|The ID of the y axis to plot this dataset on. If not specified, this defaults to the ID of the first found y axis.|
|backgroundColor|Color (String)|The fill color under the line.|
|borderColor|Color (String)|The color of the line|
|borderWidth|Number|The width of the line in pixels.|
|borderDash|Number|Length and spacing of dashes|
|borderDashOffset|Number|Offset for line dashes|
|borderCapStyle|String|Cap style of the line|
|borderJoinStyle|String|Line joint style|
|cubicInterpolationMode|String|Algorithm used to interpolate a smooth curve from the discrete data points|
|fill|Boolean/String|How to fill the area under the line|
|lineTension|Number|Bezier curve tension of the line. Set to 0 to draw straightlines. This option is ignored if monotone cubic interpolation is used.|
|pointBackgroundColor|Color (String)|The fill color for points.|
|pointBorderColor|Color (String)|The border color for points.|
|pointBorderWidth|Number|The width of the point border in pixels.|
|pointRadius|Number|The radius of the point shape. If set to 0, the point is not rendered.|
|pointStyle|String/Image|Style of the point|
|pointRotation|Number|The rotation of the point in degrees.|
|pointHitRadius|Number|The pixel size of the non-displayed point that reacts to mouse events.|
|pointHoverBackgroundColor|Color (String)|Point background color when hovered.|
|pointHoverBorderColor|Color (String)|Point border color when hovered.|
|pointHoverBorderWidth|Number|Border width of point when hovered.|
|pointHoverRadius|Number|The radius of the point when hovered.|
|showLine|Boolean|If false, the line is not drawn for this dataset.|
|spanGaps|Boolean|If true, lines will be drawn between points with no or null data. If false, points with NaN data will create a break in the line|
|steppedLine|Boolean/String|If the line is shown as a stepped line|


## Radar

|Property|Type|Description|
|--- |--- |--- |
|label|String|The label for the dataset which appears in the legend and tooltips.|
|backgroundColor|Color (String)|The fill color under the line|
|borderColor|Color (String)|The color of the line|
|borderWidth|Number|The width of the line in pixels.|
|borderDash|Number|Length and spacing of dashes|
|borderDashOffset|Number|Offset for line dashes|
|borderCapStyle|String|Cap style of the line|
|borderJoinStyle|String|Line joint style|
|fill|Boolean/String|How to fill the area under the line|
|lineTension|Number|Bezier curve tension of the line. Set to 0 to draw straightlines.|
|pointBackgroundColor|Color (String)|The fill color for points.|
|pointBorderColor|Color (String)|The border color for points.|
|pointBorderWidth|Number|The width of the point border in pixels.|
|pointRadius|Number|The radius of the point shape. If set to 0, the point is not rendered.|
|pointRotation|Number|The rotation of the point in degrees.|
|pointStyle|String/Image/Image[]|Style of the point|
|pointHitRadius|Number|The pixel size of the non-displayed point that reacts to mouse events.|
|pointHoverBackgroundColor|Color (String)|Point background color when hovered.|
|pointHoverBorderColor|Color (String)|Point border color when hovered.|
|pointHoverBorderWidth|Number|Border width of point when hovered.|
|pointHoverRadius|Number|The radius of the point when hovered.|


## Doughnut and Pie

|Property|Type|Description|
|--- |--- |--- |
|backgroundColor|Color (String)|The fill color of the arcs in the dataset|
|borderColor|Color (String)|The border color of the arcs in the dataset|
|borderWidth|Number|The border width of the arcs in the dataset.|
|hoverBackgroundColor|Color (String)|The fill colour of the arcs when hovered.|
|hoverBorderColor|Color (String)|The stroke colour of the arcs when hovered.|
|hoverBorderWidth|Number|The stroke width of the arcs when hovered.|

## Bubble

|Name|Type|Description|
|--- |--- |--- |
|backgroundColor|Color (String)| Background color of the bubbles in the dataset|
|borderColor|Color (String)| Border color of the bubbles in the dataset|
|borderWidth|Number|Border color of the bubbles in the dataset|
|data_x|Number|X coordinate that goes into the data object as x|
|data_y|Number|Y coordinate that goes into the data object as y|
|data_r|Number|Radius of the bubble in pixels that goes into the data object as r|
|hoverBackgroundColor|Color (String)|Hover background color of the bubbles in the dataset|
|hoverBorderColor|Color (String)|Hover border color of the bubbles in the dataset|
|hoverBorderWidth|Number|Hover border width of the bubbles in the dataset|
|hoverRadius|Number|Hover radius of the bubbles in the dataset|
|hitRadius|Number|Bubble radiation for hit detection|
|pointStyle|String|Bubble shape style|
|rotation|Number|Bubble rotation in degrees|

## Scatter

|Property|Type|Description|
|--- |--- |--- |
|data_x|Number| X coordinate that goes into the data object as `x`|
|data_y|Number| Y coordinate that goes into the data object as `y`|

All dataset properties of line chart are respected by scatter charts.
